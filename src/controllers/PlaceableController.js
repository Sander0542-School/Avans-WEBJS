import {TerrainView, PlaceableView, PlacebleModel} from "../CROWDR";

export default class PlaceableController {

	constructor() {
		
		let item = new PlacebleModel();
		item.height = 15;
		item.width = 15;

		let item2 = new PlacebleModel();
		item2.height = 15;
		item2.width = 15;

		let items = [item, item2];
		
		this.placeableView = new PlaceableView(items);
		
	}

	
	
}