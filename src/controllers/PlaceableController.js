import {PlaceableView, PlacebleModel, BaseController, Storage} from "../CROWDR";

export default class PlaceableController extends BaseController {

	constructor(mainController) {
		super(mainController);
		
		this.placeableView = new PlaceableView();
		this.loadPlaceables();

		this.addEvents();
	}
	
	loadPlaceables() {
		const region = Storage.getRegion("Test");

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