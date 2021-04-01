import {BaseController, SimulationView, Storage} from "../CROWDR";

export default class SimulationController extends BaseController {

	ticksPerSecond = 1;
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
		for (const region of this.regions) {
			for (const group of (region.groups || [])) {

				const cellSize = 46;
				let weather = 'rain';
				if (["rain", "shower rain", "thunderstorm"].includes(weather)) {
					if (group.status !== 'rain') {
						let counter = 0;
						let obj = region.terrain.filter(o => o.type === 'tent');
						
						if (counter >= !obj.length) {
							group.y = this.randomInt((obj[counter].row - 1) * cellSize, (obj[counter].row - 1) * cellSize + obj[counter].width * cellSize);
							group.x = this.randomInt((obj[counter].cell - 1) * cellSize, (obj[counter].cell - 1) * cellSize + obj[counter].height * cellSize);
							group.status = 'rain';
						}

					}


				} else if (["clear sky"].contains(weather)) {

				}

			}
		}
	}

	async handleLines() {
		for (let line of this.lines) {
			line.tick++;

			if (line.tick > line.speed) {
				const group = await this.randomGroup();
				const region = this.randomRegion();

				region.groups = region.groups || [];

				region.groups.push(group);
			}
		}
	}

	async startSimulation() {
		this.regions = [];

		for (const region of Storage.getRegions()) {
			if (region.locked === true) {
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
			speed: this.randomInt(0, 3)
		};
	}

	randomRegion() {
		return this.regions[Math.floor(Math.random() * this.regions.length)];
	}

	async randomGroup() {
		const size = this.randomInt(1, 4);

		const response = await fetch(`https://randomuser.me/api?results=${size}`);
		const persons = (await response.json()).results;

		return {
			persons: persons.map(person => {
				return {
					name: `${person.name.first} ${person.name.last}`
				}
			}),
			x: this.randomInt(0, 687),
			y: this.randomInt(0, 687),
		}
	}

	randomInt(min = 0, max = 3) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}