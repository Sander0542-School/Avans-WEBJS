import {TerrainView, BaseController, Storage} from "../CROWDR";

export default class TerrainController extends BaseController {

	constructor(mainController) {
		super(mainController);
		this.terrainView = new TerrainView();

		this.terrainView.loadRegion(Storage.getRegion("Test"))
	}
}