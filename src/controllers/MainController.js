import {MainView, TerrainController, PlaceableController} from "../CROWDR";

export default class MainController {
	constructor() {
		this.mainView = new MainView();
		
		this.terrainController = new TerrainController();
		this.placeableController = new PlaceableController();
	}
}