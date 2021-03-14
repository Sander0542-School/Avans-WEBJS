import {MainView, TerrainController, PlaceableController, GridController} from "../CROWDR";

export default class MainController {
	constructor() {
		this.mainView = new MainView();
		
		this.gridController = new GridController();
		
		this.terrainController = new TerrainController();
		this.placeableController = new PlaceableController();
	}
}