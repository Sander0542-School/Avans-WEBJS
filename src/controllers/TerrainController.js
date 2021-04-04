import {TerrainView, BaseController} from "../CROWDR";

export default class TerrainController extends BaseController {

	constructor(mainController) {
		super(mainController);
		this.terrainView = new TerrainView();
		this.terrainView.setRegionSelectedEvent(region => this.mainController.regionChanged(region));
	}

	loadRegion(region) {
		this.terrainView.loadRegion(region);
	};
	
	weatherChanged(weather) {
		this.terrainView.weatherChanged(weather);
	}
}