import {GridModel, GridView} from "../CROWDR";

export default class GridController {
	constructor() {
		this.gridView = new GridView();

		this.gridView.formChanged();
	}
}