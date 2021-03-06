import {PlaceableComponent, Storage, View} from "../CROWDR";

export default class TerrainView extends View {
	weatherIcon = '01d';
	
	constructor() {
		super();

		this.app = this.getElement('#terrainController');
		this.table = this.createElement('table', 'table table-bordered terrain-table');
		this.nav = this.createElement('ul', 'nav nav-tabs');
		this.actions = this.createElement('div');

		const weatherBar = this.createElement('div', 'd-flex');
		this.icon = this.createElement('img', 'weather-icon');
		
		weatherBar.append(this.icon);

		this.app.append(weatherBar, this.nav, this.table, this.actions);
	};

	setRegionSelectedEvent(regionChanged) {
		this.onRegionSelected = regionChanged;
	};

	loadRegion(region) {
		this.region = region;

		this.renderTable(region);
		this.renderNav(region);
		this.renderActions(region);
	};

	renderNav(selectedRegion = this.region) {
		this.nav.innerHTML = '';

		Storage.getRegions().forEach(region => {
			const listItem = this.createElement('li', 'nav-item');
			const listItemLink = this.createElement('a', 'nav-link');

			listItemLink.innerText = region.name;
			listItemLink.href = `#${region.name}`;
			listItemLink.dataset.region = region.name;

			if (selectedRegion.name === region.name) {
				listItemLink.classList.add('active');
			}

			listItemLink.addEventListener('click', e => {
				const regionName = e.target.dataset.region;
				this.onRegionSelected(Storage.getRegion(regionName));
			});

			listItem.append(listItemLink);
			this.nav.append(listItem);
		});
	};

	renderTable(region) {
		this.table.innerHTML = '';

		for (let rowId = 1; rowId <= 15; rowId++) {

			let tableRow = this.createElement('tr');

			for (let cellId = 1; cellId <= 15; cellId++) {
				const dropzone = this.createElement('td', 'dropzone dropable', `dropzone-${rowId}-${cellId}`);
				dropzone.dataset.row = rowId;
				dropzone.dataset.cell = cellId;

				for (const terrain of region.terrain) {
					if (terrain.row === rowId && terrain.cell === cellId) {
						dropzone.classList.remove('dropable');
						dropzone.append(new PlaceableComponent(region, terrain).render());
						break;
					}
				}

				dropzone.addEventListener('dragover', (e) => {
					if (e.target.classList.contains('dropable') && region.locked === false) {
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

						Storage.placePlaceable(region, {
							id: parseInt(placeableItem.dataset.id),
							type: placeableItem.dataset.type,
							row: parseInt(dropZone.dataset.row),
							cell: parseInt(dropZone.dataset.cell),
							height: parseInt(placeableItem.dataset.height),
							width: parseInt(placeableItem.dataset.width),
							props: JSON.parse(placeableItem.dataset.props)
						});

						this.loadRegion(Storage.getRegion(region.name));
					}
				});

				dropzone.addEventListener('dragstart', (e) => {
					e.target.parentNode.classList.add('dropable');
				});

				tableRow.appendChild(dropzone);
			}

			this.table.appendChild(tableRow);
		}
	};
	
	weatherChanged(weather) {
		this.icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
	}

	renderActions(region) {
		this.actions.innerHTML = '';

		if (region.locked === false && region.objects.length === 0) {
			const lockButton = this.createElement('button', 'btn btn-danger', 'lock-region');
			lockButton.innerText = 'Lock region';
			lockButton.addEventListener('click', () => {
				Storage.lockRegion(region);
				this.loadRegion(Storage.getRegion(region.name));
			});
			this.actions.append(lockButton);
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
	};
}