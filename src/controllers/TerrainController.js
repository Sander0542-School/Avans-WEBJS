import {TerrainView, BaseController} from "../CROWDR";

export default class TerrainController extends BaseController {

	constructor(mainController) {
		super(mainController);
		this.terrainView = new TerrainView();
		this.terrainView.selectRegion(this.selectRegion);

	}
	
	selectRegion(region){
		
		this.mainController.regionChanged(region);
		
	}
}