import {TerrainView, PlaceableView, PlacebleModel, BaseController} from "../CROWDR";

export default class PlaceableController extends BaseController {

	constructor(mainController) {
		super(mainController);
		let item = new PlacebleModel();
		item.height = 2;
		item.width = 1;
		item.id = 0;

		let item2 = new PlacebleModel();
		item2.height = 3;
		item2.width = 3;
		item2.id = 1;

		let items = [item, item2];
		this.placeableView = new PlaceableView();
		this.placeableView.loadItems(items);

		this.addEvents();
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