import {MainView, TerrainController} from "../CROWDR";

export default class MainController {
	constructor() {
		this.mainView = new MainView();
		
		this.terrainController = new TerrainController();
	}
}