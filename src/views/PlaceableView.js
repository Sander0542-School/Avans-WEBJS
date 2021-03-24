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
			// const itemCol = this.createElement('div', 'col-6');

			const itemObject = this.createElement('div', 'draggable-item', `draggable-item-${item.id}`);
			itemObject.style.height = `${46 * item.height}px`;
			itemObject.style.width = `${46 * item.width}px`;
			itemObject.innerText = item.id;
			itemObject.setAttribute('draggable', true);

			// itemCol.style.height = `${50 * item.height}px`;
			// itemCol.style.width = `${46 * item.width}px`;

			this.items.append(itemObject);
		});
	}
}