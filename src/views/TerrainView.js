import {View} from "../CROWDR";

export default class TerrainView extends View {

	constructor() {
		super();

		this.app = this.getElement('#terrainController');

		this.table = this.createElement('table', 'table table-bordered terrain-table');

		this.renderTable();

		this.app.append(this.table);
	};

	renderTable() {
		this.table.innerHTML = '';

		for (let rowId = 1; rowId <= 15; rowId++) {

			let tableRow = this.createElement('tr');

			for (let cellId = 1; cellId <= 15; cellId++) {
				const dropzone = this.createElement('td', 'dropzone dropable', `dropzone-${rowId}-${cellId} `);
				dropzone.dataset.row = rowId;
				dropzone.dataset.cell = cellId;

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
						
						dropZone.classList.remove('dropable');
						dropZone.appendChild(placeableItem);
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
}