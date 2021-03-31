import {CardComponent, NavbarComponent, View} from "../CROWDR";

export default class MainView extends View {
	constructor(locationChanged) {
		super();
		
		this.app = this.getElement('#app');
		
		const navbar = new NavbarComponent('CROWDR', (location) => locationChanged(location)).render();
		
		const container = this.createElement('main', 'm-5');
		this.row = this.createElement('div', 'row');
		container.append(this.row);
		
		this.app.append(navbar, container);
	}
	
	renderCreate() {
		this.row.innerHTML = '';
		
		const colLeft = this.createElement('div', 'col-4');
		const colMiddle = this.createElement('div', 'col-5');
		const colRight = this.createElement('div', 'col-3');

		const grid = this.createElement('div', '', 'gridController');
		const placeable = this.createElement('div', '', 'placeableController');
		const settings = this.createElement('div', '', 'settingsController');
		const terrain = this.createElement('div', '', 'terrainController');

		const gridCard = new CardComponent('Grid form', grid).render();
		const settingsCard = new CardComponent('Settings', settings).render();
		const terrainCard = new CardComponent('Terrain', terrain).render();
		const placeableCard = new CardComponent('Placeable Items', placeable).render();

		colLeft.append(gridCard, placeableCard);
		colMiddle.append(terrainCard);
		colRight.append(settingsCard);
		
		this.row.append(colLeft, colMiddle, colRight);
	}

	renderSimulation() {
		this.row.innerHTML = '';

		const simulation = this.createElement('div', 'col', 'simulationController');
		
		this.row.append(simulation);
	}
}