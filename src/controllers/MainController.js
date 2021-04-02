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

		this.loadDefaultRegion();
		this.loadDefaultLocation();
	}

	loadDefaultLocation() {
		let locationWeather = '5392171';
		this.locationChanged(locationWeather)
	}

	locationChanged(location) {
		this.weatherLocation = location;

		const API_KEY = 'e98e09391c539738e406cbea8d253955';
		fetch(`https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${API_KEY}`)
			.then(response => response.json())
			.then(json => this.weatherChanged(json.weather[0]))
			.catch(reason => console.log(reason));
	}

	weatherChanged(weather) {
		if (this.terrainController) {
			this.terrainController.weatherChanged(weather);
		}
		if (this.simulationController) {
			this.simulationController.weatherChanged(weather);
		}
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
		} else {
			window.location.hash = '';
			this.renderCreate();
		}
	}

	regionChanged(region) {
		window.location.hash = `#${region.name}`;

		this.renderCreate();
		this.terrainController.loadRegion(region);
		this.placeableController.loadRegion(region);
	}
}