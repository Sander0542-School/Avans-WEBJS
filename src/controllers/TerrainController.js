import {TerrainView, BaseController} from "../CROWDR";
import 'regenerator-runtime/runtime'

export default class TerrainController extends BaseController {

	constructor(mainController) {
		super(mainController);
		this.terrainView = new TerrainView();
		this.terrainView.setRegionSelectedEvent(region => this.mainController.regionChanged(region));
	}

	loadRegion(region) {
		this.terrainView.loadRegion(region);
		this.loadWeather();
	};

	loadWeather() {
		const API_KEY = 'e98e09391c539738e406cbea8d253955';

		fetch('https://api.openweathermap.org/data/2.5/weather?id=2756252&appid=' + API_KEY)
			.then(response => response.json())
			.then(json => {
				this.terrainView.weatherLoaded(json);
			})
			.catch((e) => {
				
			});
	}

}