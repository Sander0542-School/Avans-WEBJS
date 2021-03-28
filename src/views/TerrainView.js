import {PlaceableComponent, Storage, View} from "../CROWDR";

export default class TerrainView extends View {
	constructor() {
		super();

		this.app = this.getElement('#terrainController');
		this.table = this.createElement('table', 'table table-bordered terrain-table');
		this.nav = this.createElement('ul', 'nav nav-tabs');
		this.icon = this.createElement('img');
		

		this.app.append(this.nav);
		this.app.append(this.table);
	};

	setRegionSelectedEvent(regionChanged) {
		this.onRegionSelected = regionChanged;
	};

	getWeatherInfo() {
		
	};
	
	loadRegion(region) {
		this.region = region;

		this.renderTable(region);
		this.renderNav(region);
	};

	renderNav(selectedRegion) {
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
		
		const weatherInfo = this.loadWeather();
		console.log(weatherInfo);
		
		
		this.icon.src = `https://openweathermap.org/img/wn/${weatherInfo[0]["weather"]["icon"]}@2x.png`;
		this.nav.append(this.icon);
		
	};

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
	};

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