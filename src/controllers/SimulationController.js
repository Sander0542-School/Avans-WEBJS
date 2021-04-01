import {BaseController, SimulationView, Storage} from "../CROWDR";

export default class SimulationController extends BaseController {

	ticksPerSecond = 20;
	maxPerRegion = 15 * 15 * 7;
	maxPerField = 7;
	cellSize = 46;

	tickId = 0;
	lines = [];
	regions = [];
	lineCount = 3;
	enabled = false;

	constructor(mainController) {
		super(mainController);
		this.simulationView = new SimulationView();
		this.lineCountChanged(this.lineCount);
	}

	weatherChanged(weather) {
		this.weather = weather;
	}

	lineCountChanged(lineCount) {
		this.lines = this.lines.slice(0, lineCount);

		while (this.lines.length < lineCount) {
			this.lines.push(this.randomLine());
		}
	}

	async tick() {
		this.tickId++;

		await this.handleLines();
		await this.handleWeather();

		this.simulationView.render(this.regions);

		if (this.enabled) {
			setTimeout(() => this.tick(), 1000 / this.ticksPerSecond);
		}
	}

	async handleWeather() {
		const cellSize = 46;

		for (const region of this.regions) {
			for (const field of region.fields) {
				for (const group of field.groups) {
					const weather = this.weather.main;
					switch (weather) {
						case 'Thunderstorm':
						case 'Drizzle':
						case 'Rain':
						case 'Snow':
							if (group.status !== 'rain') {
								const tents = region.terrain.filter(o => o.type === 'tent');
								const tent = tents[Math.floor(Math.random() * tents.length)];

								const fields = this.getPlaceableFields(tent);
								const newFieldId = fields[Math.floor(Math.random() * fields.length)];
								const newField = region.fields.filter(newField1 => newField1.id === newFieldId)[0];

								let fieldVisitors = 0;
								for (let group1 of newField.groups) {
									fieldVisitors += group1.persons.length;
								}

								if (fieldVisitors + group.persons.length <= tent.props.maxVisitors) {
									group.status = 'rain';
									newField.groups.push(group);
									field.groups.splice(field.groups.indexOf(group));
								}
							}
							break;
						case 'Clear':
							if (group.status !== 'clear') {
								const placeables = region.terrain.filter(o => o.type === 'drink' || o.type.substr(0, 4) === 'tree');
								const placeable = placeables[Math.floor(Math.random() * placeables.length)];

								const fields = this.getSurroundingFields(this.getPlaceableFields(placeable));
								const newFieldId = fields[Math.floor(Math.random() * fields.length)];
								const newField = region.fields.filter(newField1 => newField1.id === newFieldId)[0];

								group.status = 'clear';
								field.groups.splice(field.groups.indexOf(group));
								newField.groups.push(group);
							}
							break;
						default:
							if (group.status !== 'normal') {
								this.shuffle(region.openFields);

								for (let fieldId of region.openFields) {
									const newField = region.fields.filter(field1 => field1.id === fieldId)[0];

									if (newField.visitors + group.persons.length <= this.maxPerField) {
										newField.visitors += group.persons.length;
										newField.visitors += group.persons.length;
										group.status = 'normal';
										field.groups.splice(field.groups.indexOf(group));
										newField.groups.push(group);
										break;
									}
								}
							}
							break;
					}
				}
			}
		}
	}

	async handleLines() {
		for (let line of this.lines) {
			line.tick++;

			if (line.tick > line.speed) {
				line.tick = 0;
				const group = await this.randomGroup();
				line.queue.unshift(group);
			}

			if (line.queue.length > 0) {
				const group = line.queue[line.queue.length - 1];

				const region = this.randomRegion();
				this.shuffle(region.openFields);

				for (let fieldId of region.openFields) {
					const field = region.fields.filter(field1 => field1.id === fieldId)[0];

					if (field.visitors + group.persons.length <= this.maxPerField) {
						field.visitors += group.persons.length;
						region.visitors += group.persons.length;
						field.groups.push(line.queue.pop());
						break;
					}
				}
			}
		}
	}

	async startSimulation() {
		this.regions = [];

		for (const region of Storage.getRegions()) {
			if (region.locked === true) {
				region.visitors = 0;
				region.fields = [];
				region.openFields = [];

				for (let i = 1; i <= (15 * 15); i++) {
					region.fields.push({
						id: i,
						visitors: 0,
						groups: []
					});
					region.openFields.push(i);
				}

				for (let placeable of region.terrain) {
					for (let fieldId of this.getPlaceableFields(placeable)) {
						region.openFields.splice(region.openFields.indexOf(fieldId), 1);
					}
				}

				region.maxVisitors = region.fields.length * 7;

				this.regions.push(region);
			}
		}

		this.simulationView.render(this.regions);

		this.enabled = true;

		await this.tick();
	};

	async resumeSimulation() {
		this.enabled = false;

		await this.tick();
	};

	pauseSimulation() {
		this.enabled = false;
	};

	randomLine() {
		return {
			tick: 0,
			speed: this.randomInt(0, 3),
			queue: []
		};
	}

	randomRegion() {
		return this.regions[Math.floor(Math.random() * this.regions.length)];
	}

	async randomGroup() {
		const size = this.randomInt(1, 4);

		const response = await fetch(`https://randomuser.me/api?results=${size}&nat=nl`);
		const persons = (await response.json()).results;

		return {
			persons: persons.map(person => {
				return {
					name: `${person.name.first} ${person.name.last}`
				}
			}),
			status: 'normal',
			x: this.randomInt(0, this.cellSize - 3),
			y: this.randomInt(0, this.cellSize - 3),
		}
	}

	randomInt(min = 0, max = 3) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getPlaceableFields(placeable) {
		const fields = [];

		for (let rowId = placeable.row; rowId < placeable.row + placeable.height; rowId++) {
			const rowStart = (rowId - 1) * 15;

			for (let cellId = placeable.cell; cellId < placeable.cell + placeable.width; cellId++) {
				fields.push(rowStart + cellId);
			}
		}

		return fields;
	}

	getSurroundingFields(fields) {
		const sFields = [];

		for (let fieldId of fields) {
			// North
			sFields.push(fieldId - 15);
			// North East
			sFields.push(fieldId - 14);
			// East
			sFields.push(fieldId + 1);
			// South East
			sFields.push(fieldId + 16);
			// South
			sFields.push(fieldId + 15);
			// South West
			sFields.push(fieldId + 14);
			// West
			sFields.push(fieldId - 1);
			// North West
			sFields.push(fieldId - 16);
		}
		for (let fieldId of fields) {
			if (sFields.includes(fieldId)) {
				sFields.splice(sFields.indexOf(fieldId), 1);
			}
		}
		for (let fieldId of sFields) {
			if (fieldId < 1 || fieldId > 15 * 15) {
				sFields.splice(sFields.indexOf(fieldId), 1);
			}
		}

		return sFields;
	}

	shuffle(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
}