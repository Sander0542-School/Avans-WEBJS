import {PlaceableView, BaseController} from "../CROWDR";

export default class PlaceableController extends BaseController {

	constructor(mainController) {
		super(mainController);
		
		this.placeableView = new PlaceableView();

		this.addEvents();
	}
	
	loadRegion = (region) => {
		this.placeableView.loadItems(region.objects)
	};

	addEvents = () => {
		const items = document.querySelectorAll('.draggable-item');

		items.forEach(item => {
			item.addEventListener('dragstart', e => {
				e.dataTransfer.setData('text/plain', e.target.id);
			});
		});
	};

}