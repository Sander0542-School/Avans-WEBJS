import {RegionForm, RegionFormComponent, View} from "../CROWDR";

export default class GridView extends View {
	constructor() {
		super();

		this.app = this.getElement('#gridController');

		const form = this.createElement('div', '', 'gridForm');
		this.app.append(form);
		
		this.regionForm = new RegionFormComponent('gridForm', (form) => this.onGridCreated(form));
		this.regionForm.make();
	}

	setGridCreatedEvent(gridCreated) {
		this.onGridCreated = gridCreated;
	}
	
	resetForm() {
		this.regionForm.reset();
	}
}