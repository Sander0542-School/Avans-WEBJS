import {
	Controller,
	GridController,
	MainView,
	PlaceableController,
	SettingsController,
	TerrainController
} from "../CROWDR";

export default class MainController extends Controller {
	constructor() {
		super();
		this.mainView = new MainView();

		this.gridController = new GridController();
		this.placeableController = new PlaceableController();
		this.settingsController = new SettingsController();
		this.terrainController = new TerrainController();
	}
}