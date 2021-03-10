import {GridController, MainView} from "../CROWDR";

export default class MainController {
	constructor() {
		this.mainView = new MainView();
		
		this.gridController = new GridController();
	}
}