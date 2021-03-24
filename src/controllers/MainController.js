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

		this.gridController = new GridController(this);
		this.placeableController = new PlaceableController(this);
		this.settingsController = new SettingsController(this);
		this.terrainController = new TerrainController(this);
	}
}