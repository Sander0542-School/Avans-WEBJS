import {Controller, GridController, MainView} from "../CROWDR";

export default class MainController extends Controller {
	constructor() {
		super();
		this.mainView = new MainView();

		this.gridController = new GridController();
	}
}