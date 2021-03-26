import {PlaceableView, PlacebleModel, BaseController, Storage} from "../CROWDR";

export default class PlaceableController extends BaseController {

	constructor(mainController) {
		super(mainController);
		
		this.placeableView = new PlaceableView();
		let regions = Storage.getRegions();
		this.loadPlaceables(regions[0].name);

		this.addEvents();
	}
	
	loadPlaceables(regionName) {
		const region = Storage.getRegion(regionName);

		this.placeableView.loadItems(region.objects)
	}

	addEvents() {
		const items = document.querySelectorAll('.draggable-item');

		items.forEach(item => {
			item.addEventListener('dragstart', e => {
				e.dataTransfer.setData('text/plain', e.target.id);
			});
		});
	}

}