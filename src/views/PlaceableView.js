import {View} from "../CROWDR";

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
			const placeableElem = this.createElement('div', 'draggable-item', `draggable-item-${item.id}`);
			placeableElem.style.height = `${46 * item.height}px`;
			placeableElem.style.width = `${46 * item.width}px`;
			placeableElem.innerText = item.type;
			placeableElem.setAttribute('draggable', true);
			placeableElem.dataset.type = item.type;
			placeableElem.dataset.width = item.width;
			placeableElem.dataset.height = item.height;

			this.items.append(placeableElem);
		});
	}
}