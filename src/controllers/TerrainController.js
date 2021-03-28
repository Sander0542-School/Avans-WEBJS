import {TerrainView, BaseController} from "../CROWDR";
import 'regenerator-runtime/runtime'

export default class TerrainController extends BaseController {

	 constructor(mainController) {
		super(mainController);
		const info = this.loadWeather();
		this.terrainView = new TerrainView();
		this.terrainView.setRegionSelectedEvent(region => this.mainController.regionChanged(region));
		this.terrainView.getWeatherInfo(() => this.loadWeather());
	}
	

	loadRegion(region) {
		this.terrainView.loadRegion(region);
	};

	 loadWeather(){
		const API_KEY = 'e98e09391c539738e406cbea8d253955';
		return  fetch('https://api.openweathermap.org/data/2.5/weather?id=2756252&appid=' + API_KEY)
			.then(function(resp) { return resp.json() }) // Convert data to json
			.then(function(resp) {
				if(resp.ok) {
					return resp.json();
				} else {
					throw new Error('Server response wasn\'t OK');
				}
			})
			.catch(function() {
				// catch any errors
			});


			// const response = await fetch('https://api.openweathermap.org/data/2.5/weather?id=2756252&appid=' + API_KEY, {});
			// const json = await response.json();
			//
			// return json
		}
	
}