import {TerrainView, BaseController} from "../CROWDR";

export default class TerrainController extends BaseController {

	constructor(mainController) {
		super(mainController);
		this.terrainView = new TerrainView();

	}
}