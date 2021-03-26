import {
	Controller,
	GridController,
	MainView,
	PlaceableController,
	SettingsController,
	Storage,
	TerrainController
} from "../CROWDR";

export default class MainController extends Controller {
	constructor() {
		super();
		this.mainView = new MainView();

		this.gridController = new GridController(this);
		this.settingsController = new SettingsController(this);
		this.terrainController = new TerrainController(this);
		this.placeableController = new PlaceableController(this);

		this.loadDefaultRegion();
	}

	loadDefaultRegion = () => {
		const region = Storage.getRegions()[0];
		if (region != null) {
			this.regionChanged(region);
		}
	}

	regionChanged = (region) => {
		this.terrainController.loadRegion(region);
		this.placeableController.loadRegion(region);
	}
}