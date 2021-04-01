import {CardComponent, View} from "../CROWDR";

export default class SimulationView extends View {
	constructor() {
		super();

		this.app = this.getElement('#simulationController');

		const row = this.createElement('div', 'row');
		const colLeft = this.createElement('div', 'col-8');
		const colRight = this.createElement('div', 'col-4');

		this.regions = this.createElement('div', 'row simulation-list');
		const canvasesCard = new CardComponent('Regions', this.regions).render();

		const settingsCard = new CardComponent('Settings').render();

		this.persons = this.createElement('table', 'table table-sm table-borderless');
		const infoCard = new CardComponent('Information', this.persons).render();

		colLeft.append(canvasesCard);
		colRight.append(settingsCard, infoCard);

		row.append(colLeft, colRight);

		this.app.append(row);

		this.cacheImages();
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

	render(regions) {
		this.renderRegions(regions);
	};

	renderRegions(regions) {
		this.regions.innerHTML = '';

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

				const canvasX = (rowId - 1) * cellSize;
				const canvasY = (cellId - 1) * cellSize;

				context.drawImage(this.images[placeable.type], canvasY, canvasX, placeable.width * cellSize, placeable.height * cellSize);
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
			for (const person of persons) {
				const row = this.persons.insertRow();
				row.insertCell().innerText = person.name;
			}
		}
	}
}