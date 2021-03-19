import {BaseController, GridModel, GridView} from "../CROWDR";

export default class GridController extends BaseController {
	constructor(mainController) {
		super(mainController);
		this.gridView = new GridView();

		this.gridView.formChanged();
	}
}