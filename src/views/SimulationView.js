import {CardComponent, View} from "../CROWDR";

export default class SimulationView extends View {
	constructor() {
		super();

		this.app = this.getElement('#simulationController');

		const row = this.createElement('div', 'row');
		const colLeft = this.createElement('div', 'col-8');
		const colRight = this.createElement('div', 'col-4');

		this.canvases = this.createElement('div', 'simulation-list');
		const canvasesCard = new CardComponent('Regions', this.canvases).render();

		const settingsCard = new CardComponent('Settings').render();

		this.persons = this.createElement('table', 'table table-sm table-borderless');
		const infoCard = new CardComponent('Information', this.persons).render();

		colLeft.append(canvasesCard);
		colRight.append(settingsCard, infoCard);

		row.append(colLeft, colRight);

		this.app.append(row);
	};

	render(regions) {
		this.renderCanvases(regions);
	};

	renderCanvases(regions) {
		this.canvases.innerHTML = '';

		for (const region of regions) {
			const canvas = this.createElement('canvas', 'simulation-canvas');
			canvas.width = 690;
			canvas.height = 690;
			canvas.dataset.region = region.name;

			this.renderCanvas(region, canvas);
			this.canvases.append(canvas);
		}
	}

	renderCanvas(region, canvas) {
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = 'green';
		context.fillRect(0, 0, canvas.width, canvas.height);

		const cellSize = 46;
		let terrainItems = [];
		for (let rowId = 1; rowId <= 15; rowId++) {
			for (let cellId = 1; cellId <= 15; cellId++) {
				let placeable = null;
				
				for (let terrainItem of region.terrain) {
					if (terrainItem.row === rowId && terrainItem.cell === cellId) {
						terrainItems.push(terrainItem);
						placeable = terrainItem;
						break;
					}
				}

				if (placeable == null) {
					continue;
				}

				const canvasX = (rowId - 1) * cellSize;
				const canvasY = (cellId - 1) * cellSize;

				const image = new Image();
				image.src = `/assets/tiles/${placeable.type}.jpg`;

				image.onload = () => {
					context.drawImage(image, canvasY, canvasX, placeable.width * cellSize, placeable.height * cellSize);
					context.globalAlpha = 0.5;
				}
			}
		}

		for (const group of (region.groups || [])) {
			
			let weather = 'rain';
			if( ["rain", "shower rain", "thunderstorm"].includes(weather)){
				let obj = terrainItems.find(o => o.type === 'tent');

				let row = this.randomInteger((obj.row -1) * cellSize, (obj.row - 1) * cellSize + obj.width  * cellSize);
				let cell = this.randomInteger((obj.cell -1 ) * cellSize, (obj.cell - 1) * cellSize + obj.height  * cellSize);
				
				group.x = cell;
				group.y = row;
				
				
				context.rect(cell, row, 3, 3);
			}
			else if(["clear sky"].contains(weather)){
				
			}
			else{
				context.rect(group.x, group.y, 3, 3);
			}
		}
		context.fillStyle = 'red';
		context.fill();

		canvas.onmousemove = (e) => {
			const rect = e.target.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			for (const group of (region.groups || [])) {
				if (x >= group.x && x <= group.x + 3 && y >= group.y && y <= group.y + 3) {
					this.renderGroup(group.persons);
					break;
				}
				this.renderGroup();
			}
		}
	};
	
	randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
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