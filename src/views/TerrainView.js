import {PlaceableComponent, Storage, View} from "../CROWDR";

export default class TerrainView extends View {


	constructor() {
		super();

		this.app = this.getElement('#terrainController');

		this.table = this.createElement('table', 'table table-bordered terrain-table');
		this.nav = this.createElement('ul', 'nav nav-tabs');

		this.renderNav();
		this.renderTable();

		this.app.append(this.nav);
		this.app.append(this.table);
	};
	
	loadRegion(region) {
		this.region = region;
		
		this.renderTable();
	}

	renderNav() {
		let regions = Storage.getRegions();

		regions.forEach(region => {
			this.listItem = this.createElement('li', 'nav-item');

			const listItemLink = this.createElement('a', 'nav-link');
			listItemLink.dataset.region = region.name;

			listItemLink.addEventListener('click', e => {

				this.onRegionSelect(e.target.dataset.region);

			});

			listItemLink.innerText = region.name;

			this.listItem.append(listItemLink);
			this.nav.append(this.listItem);

		});
	}


	selectRegion(regionName) {
		this.onRegionSelect = regionName;
	}

	renderTable() {
		this.table.innerHTML = '';

		for (let rowId = 1; rowId <= 15; rowId++) {

			let tableRow = this.createElement('tr');

			for (let cellId = 1; cellId <= 15; cellId++) {
				const dropzone = this.createElement('td', 'dropzone dropable', `dropzone-${rowId}-${cellId}`);
				dropzone.dataset.row = rowId;
				dropzone.dataset.cell = cellId;

				for (let terrain of this.region.terrain) {
					if (terrain.row === rowId && terrain.cell === cellId) {
						dropzone.classList.remove('dropable');
						dropzone.append(new PlaceableComponent(terrain).render());
						break;
					}
				}

				dropzone.addEventListener('dragover', (e) => {
					if (e.target.classList.contains('dropable')) {
						e.preventDefault();
					}
				});

				dropzone.addEventListener('drop', (e) => {
					const dropZone = e.target;
					const placeableItem = document.getElementById(e.dataTransfer.getData('text/plain'));

					if (placeableItem) {

						if (parseInt(dropZone.dataset.row) + parseInt(placeableItem.dataset.height) > 16) {
							return false;
						}
						if (parseInt(dropZone.dataset.cell) + parseInt(placeableItem.dataset.width) > 16) {
							return false;
						}
						if (!this.hasItem(dropZone.dataset.row, dropZone.dataset.cell, placeableItem)) {
							return false;
						}
						dropZone.classList.remove('dropable');
						dropZone.appendChild(placeableItem);

						const success = Storage.placePlaceable(this.region, {
							id: parseInt(placeableItem.dataset.id),
							type: placeableItem.dataset.type,
							row: parseInt(dropZone.dataset.row),
							cell: parseInt(dropZone.dataset.cell),
							height: parseInt(placeableItem.dataset.height),
							width: parseInt(placeableItem.dataset.width),
						});
						
						this.region = Storage.getRegion(this.region.name);
						
						console.log(success);
					}
				});

				dropzone.addEventListener('dragstart', (e) => {
					e.target.parentNode.classList.add('dropable');
				});

				tableRow.appendChild(dropzone);
			}

			this.table.appendChild(tableRow);
		}
	}

	hasItem(rowNumber, cellNumber, item) {
		for (let rowID = 0; rowID < item.dataset.height; rowID++) {

			for (let cellID = 0; cellID < item.dataset.width; cellID++) {
				let id = `dropzone-${parseInt(rowNumber) + parseInt(rowID)}-${parseInt(cellNumber) + parseInt(cellID)}`;
				let cell = document.getElementById(id);
				if (cell.hasChildNodes()) {
					return false;
				}
			}
		}

		return true;
	}
}