import {TerrainView, BaseController} from "../CROWDR";

export default class TerrainController extends BaseController {

	constructor(mainController) {
		super(mainController);
		this.terrainView = new TerrainView();
		this.terrainView.setRegionSelectedEvent(this.mainController.regionChanged);
	}
	
	loadRegion = (region) => {
		this.terrainView.loadRegion(region);
	};
}