import {PlaceableComponent, View} from "../CROWDR";

export default class PlaceableView extends View {
	constructor() {
		super();

		this.app = this.getElement('#placeableController');
		this.items = this.createElement('div', 'draggable-items', 'placeable-items');

		const container = this.createElement('div', '', 'draggable-items');
		container.append(this.items);

		this.app.appendChild(container);
	};

	loadRegion(region) {
		this.items.innerHTML = '';

		region.objects.forEach(item => {
			this.items.append(new PlaceableComponent(region, item).render());
		});
	};
}