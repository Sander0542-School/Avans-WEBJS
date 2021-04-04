import {CardComponent, View} from "../CROWDR";

export default class SimulationView extends View {
	constructor(lineCountChanged) {
		super();

		this.lineCountChanged = lineCountChanged;

		this.app = this.getElement('#simulationController');

		const row = this.createElement('div', 'row');
		const colLeft = this.createElement('div', 'col-8');
		const colRight = this.createElement('div', 'col-4');

		this.regions = this.createElement('div', 'row simulation-list');
		const canvasesCard = new CardComponent('Regions', this.regions).render();

		this.audio = this.createElement('audio', '', 'audienceAudio');
		this.audioSource = this.createElement('source', '', 'audienceAudioSource');
		this.audioSource.setAttribute("type", "audio/mpeg");
		this.audio.setAttribute("muted", true);
		this.audioSource.src = `/assets/sounds/audience_short.mp3`;
		this.audio.append(this.audioSource);

		this.lineSettings = this.createElement('div', '', 'lineSettings');
		const settingsCard = new CardComponent('Settings', this.lineSettings).render();

		this.lineInfo = this.createElement('table', 'table table-sm table-borderless', 'line-table');
		const lineInfoCard = new CardComponent('Festival Lines', this.lineInfo).render();

		this.persons = this.createElement('table', 'table table-sm table-borderless', 'information-card');
		const infoCard = new CardComponent('Information', this.persons).render();

		colLeft.append(canvasesCard);
		colRight.append(settingsCard, lineInfoCard, infoCard, this.audio);

		row.append(colLeft, colRight);

		this.app.append(row);

		this.cacheImages();
		this.renderSettings();
	};

	cacheImages() {
		const types = [
			'drink',
			'food',
			'tent',
			'toilet',
			'trash',
			'tree_high',
			'tree_shadow',
			'tree_wide',
		];

		this.images = [];

		for (const type of types) {
			const image = new Image();
			image.src = `/assets/tiles/${type}.jpg`;

			this.images[type] = image;
		}
	}

	render(regions, lines) {
		this.renderRegions(regions);
		this.renderLines(lines)
	};

	renderRegions(regions) {
		this.regions.innerHTML = '';

		if (regions.length === 0) {
			this.regions.innerText = 'There are no locked regions to simulate.';
			return;
		}
		for (const region of regions) {
			const regionCol = this.createElement('div', 'col-12');

			const regionName = this.createElement('h5');
			regionName.innerText = region.name;

			const regionVisitors = this.createElement('h6');
			regionVisitors.innerText = `Visitors: ${region.visitors}/${region.maxVisitors}`;

			const canvas = this.createElement('canvas', 'simulation-canvas');
			canvas.width = 690;
			canvas.height = 690;
			canvas.dataset.region = region.name;

			this.renderCanvas(region, canvas);
			regionCol.append(regionName, regionVisitors, canvas);
			this.regions.append(regionCol);
		}
	}

	renderCanvas(region, canvas) {
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = 'green';
		context.fillRect(0, 0, canvas.width, canvas.height);

		const cellSize = 46;
		for (let rowId = 1; rowId <= 15; rowId++) {
			for (let cellId = 1; cellId <= 15; cellId++) {
				let placeable = null;

				for (let terrainItem of region.terrain) {
					if (terrainItem.row === rowId && terrainItem.cell === cellId) {
						placeable = terrainItem;
						break;
					}
				}

				if (placeable == null) {
					continue;
				}

				const canvasY = (rowId - 1) * cellSize;
				const canvasX = (cellId - 1) * cellSize;

				context.drawImage(this.images[placeable.type], canvasX, canvasY, placeable.width * cellSize, placeable.height * cellSize);

				if (placeable.type === 'trash') {
					const lineLength = cellSize / placeable.props.capacity * (placeable.props.trash || 0);

					context.beginPath();
					context.lineWidth = 5;
					context.strokeStyle = 'darkorange';
					context.moveTo(canvasX + cellSize - 3, canvasY + cellSize);
					context.lineTo(canvasX + cellSize - 3, canvasY + cellSize - lineLength);
					context.stroke();
				}
			}
		}

		for (const field of region.fields) {
			const rowId = Math.floor((field.id - 1) / 15);
			const cellId = field.id - (rowId * 15) - 1;

			for (const group of field.groups) {
				const groupX = (cellId * 46) + group.x;
				const groupY = (rowId * 46) + group.y;
				context.rect(groupX, groupY, 3, 3);
			}
		}
		context.fillStyle = 'red';
		context.fill();

		canvas.onmousemove = (e) => {
			const rect = e.target.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			for (const field of region.fields) {
				const rowId = Math.floor((field.id - 1) / 15);
				const cellId = field.id - (rowId * 15) - 1;

				for (const group of field.groups) {
					const groupX = (cellId * 46) + group.x;
					const groupY = (rowId * 46) + group.y;

					if (x >= groupX && x <= groupX + 3 && y >= groupY && y <= groupY + 3) {
						this.renderGroup(group.persons);
						return;
					}
					this.renderGroup();
				}
			}
		}
	};

	renderGroup(persons) {
		this.persons.innerHTML = '';
		if (persons) {

			switch (persons.length) {
				case 1:
					this.audio.volume = 0.2;
					break;
				case 2:
					this.audio.volume = 0.3;
					break;
				case 3:
					this.audio.volume = 0.5;
					break;
				case 4:
					this.audio.volume = 1;
					break;
				default:
					this.audio.volume = 1;
			}
			let isAllowed = this.audio.play();

			if (isAllowed !== undefined) {
				isAllowed.catch(function (error) {
					console.log("Wegens de beveiliging van de browser kunnen we geen geluid afspelen, klik op het scherm om dit te laten werken.")
				});
			}

			for (const person of persons) {
				const row = this.persons.insertRow();
				row.insertCell().innerText = person.name;
			}
		}
	}

	renderSettings() {
		this.lineSettings.innerHTML = '';

		const lineHelp = this.createElement('h6');
		lineHelp.innerText = 'Line Count';

		const addLineButton = this.createElement('button', 'btn btn-success', 'add-line');
		addLineButton.innerText = '+';
		addLineButton.addEventListener('click', () => {
			this.lineCountChanged(1);
		});

		const removeLineButton = this.createElement('button', 'btn btn-danger mx-2', 'remove-line');
		removeLineButton.innerText = '-';
		removeLineButton.addEventListener('click', () => {
			this.lineCountChanged(-1);
		});

		this.lineSettings.append(lineHelp, addLineButton, removeLineButton);
	}

	renderLines(lines) {
		this.lineInfo.innerHTML = '';

		const row = this.lineInfo.insertRow();
		row.insertCell().innerText = 'Scans every x seconds';
		row.insertCell().innerText = 'Queue Length';

		for (const line of lines) {
			const row = this.lineInfo.insertRow();
			row.insertCell().innerText = line.speed;
			row.insertCell().innerText = line.queue.length;
		}
	}
}