import {
	Controller,
	GridController,
	MainView,
	PlaceableController,
	SettingsController, SimulationController,
	Storage,
	TerrainController
} from "../CROWDR";

export default class MainController extends Controller {
	constructor() {
		super();
		this.mainView = new MainView((location) => this.locationChanged(location));

		window.onhashchange = ev => this.loadDefaultRegion();

		this.loadDefaultRegion();
		this.loadDefaultLocation();
	}

	loadDefaultLocation() {
		let locationWeather = '5392171';
		this.locationChanged(locationWeather)
	}
	
	locationChanged(locationWeather) {
		this.terrainController.loadWeather(locationWeather);
	}
	
	renderCreate() {
		this.mainView.renderCreate();

		this.gridController = new GridController(this);
		this.settingsController = new SettingsController(this);
		this.terrainController = new TerrainController(this);
		this.placeableController = new PlaceableController(this);
	}

	async renderSimulation() {
		this.mainView.renderSimulation();

		this.simulationController = new SimulationController(this);
		this.simulationController.startSimulation().then();
	}

	loadDefaultRegion() {
		let region = null;

		if (window.location.hash) {
			if (window.location.hash === '#simulation') {
				this.renderSimulation();
				return;
			}
			region = Storage.getRegion(window.location.hash.substring(1));
		}

		if (!region) {
			region = Storage.getRegions()[0];
		}

		if (region != null) {
			this.regionChanged(region);
		}
	}

	regionChanged(region) {
		window.location.hash = `#${region.name}`;

		this.renderCreate();
		this.terrainController.loadRegion(region);
		this.placeableController.loadRegion(region);
	}
}