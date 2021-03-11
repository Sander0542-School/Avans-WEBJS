import {CardComponent, NavbarComponent, View} from "../CROWDR";

export default class MainView extends View {
	constructor() {
		super();
		
		this.app = this.getElement('#app');
		
		const navbar = new NavbarComponent('CROWDR').render();
		
		const container = this.createElement('main', 'm-5');
		const row = this.createElement('div', 'row');
		const colLeft = this.createElement('div', 'col-4');
		const colMiddle = this.createElement('div', 'col-5');
		const colRight = this.createElement('div', 'col-3');
		
		const grid = this.createElement('div', '', 'gridController');
		const placeable = this.createElement('div', '', 'placeableController');
		const settings = this.createElement('div', '', 'settingsController');
		const terrain = this.createElement('div', '', 'terrainController');
		
		const gridCard = new CardComponent('Grid form', grid).render();
		const placeableCard = new CardComponent('Placeable Items', placeable).render();
		const settingsCard = new CardComponent('Settings', settings).render();
		const terrainCard = new CardComponent('Terrain', terrain).render();
		
		colLeft.appendChild(gridCard);
		colLeft.appendChild(placeableCard);
		colMiddle.appendChild(terrainCard);
		colRight.appendChild(settingsCard);

		container.appendChild(row);
		row.appendChild(colLeft, colMiddle, colRight);
		
		this.app.appendChild(navbar, container);
	}
}