import {View} from "../CROWDR";

export default class TerrainView extends View {
	
	constructor() {
		super();
		
		this.app = this.getElement('#terrainController');
		
		// const container = this.createElement('div', '', 'drag-container ');
		// container.style.setProperty('--grid-rows', 15);
		// container.style.setProperty('--grid-cols', 15);
		//
		// for (let c = 0; c < (15 * 15); c++) {
		// 	let cell = document.createElement("div");
		//	
		// 	container.appendChild(cell).className = "grid-item dropzones";
		// }


			var table = this.createElement('table', 'table table-bordered');
			var tableBody = this.createElement('tbody');

			for (let rowData = 1; rowData <= 15; rowData++){
				
				var row = this.createElement('tr');

				for (let cellData = 1; cellData <= 15; cellData++) {
					var cell = this.createElement('td', 'dropzones', `${rowData}, ${cellData} `);
					// cell.addEventListener('dragenter', (e) => {
					// 	if (e.target.classList.contains('dropzone')) {
					// 		e.target.classList.add('solid-border');
					// 	}
					// });
					// cell.addEventListener('drop', (e) => {
					// 	e.preventDefault();
					// 	e.target.appendChild(el);
					// 	el = null;
					// 	e.target.classList.remove('solid-border');
					// });
					cell.innerText = `${rowData} ${cellData} `;
					row.appendChild(cell);
				}

				tableBody.appendChild(row);
			}

			table.appendChild(tableBody);
		
		
		this.app.append(table);
	};


	 

	
}