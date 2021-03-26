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

	loadItems(items) {
		this.items.innerHTML = '';

		items.forEach(item => {
			this.items.append(new PlaceableComponent(item).render());
		});
	};
}