import {PlaceableView, BaseController} from "../CROWDR";

export default class PlaceableController extends BaseController {

	constructor(mainController) {
		super(mainController);
		
		this.placeableView = new PlaceableView();
	}
	
	loadRegion(region) {
		this.placeableView.loadRegion(region)
	};

}