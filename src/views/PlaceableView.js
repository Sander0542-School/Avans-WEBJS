import {View} from "../CROWDR";

export default class PlaceableView extends View {

	constructor(allItems) {
		super();

		this._allItems = allItems;

		this.app = this.getElement('#placeableController');

		const container = this.createElement('div', '', 'drag-items');
		const items = this.createElement('div', 'draggable-items');
		const row = this.createElement('div', 'row');
		const col = this.createElement('div', 'col');

		this._allItems.forEach(item => {
			const itemCol = this.createElement('div');
			
			let itemObject = col.appendChild(this.createElement('div', 'draggable-item', `item-header item-${item.id}`));
			itemObject.style.height = `${46 * item.height}px`;
			itemObject.style.width = `${46 * item.width}px`;
			itemObject.innerText = item.id;
			itemObject.setAttribute('draggable', true);

			itemCol.style.height = `${50 * item.height}px`;
			itemCol.style.width = `${46 * item.width}px`;
			
			col.append(itemCol);
		});

		row.append(col);
		items.append(row);
		container.append(items);

		this.app.appendChild(container);
	};


}