import {View} from "../CROWDR";

export default class TerrainView extends View {
	
	constructor() {
		super();
		
		this.app = this.getElement('#terrainController');
		
		const container = this.createElement('div', '', 'drag-container ');
		container.style.setProperty('--grid-rows', 15);
		container.style.setProperty('--grid-cols', 15);
		
		for (let c = 0; c < (15 * 15); c++) {
			let cell = document.createElement("div");
			
			container.appendChild(cell).className = "grid-item dropzones";
		}
		
		
		this.app.append(container);
	};


	 

	
}