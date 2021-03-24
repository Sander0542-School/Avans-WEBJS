import {View} from "../CROWDR";

export default class TerrainView extends View {

	constructor() {
		super();

		this.app = this.getElement('#terrainController');

		let table = this.createElement('table', 'table table-bordered');
		let tableBody = this.createElement('tbody');

		for (let rowData = 1; rowData <= 15; rowData++) {

			let row = this.createElement('tr');

			for (let cellData = 1; cellData <= 15; cellData++) {
				let cell = this.createElement('td', 'dropzones dropable', `${rowData}-${cellData} `);
				cell.innerText = ` `;
				row.appendChild(cell);
			}

			tableBody.appendChild(row);
		}

		table.appendChild(tableBody);


		this.app.append(table);
	};


}