import {View} from "../CROWDR";

export default class PlaceableView extends View {
	
	constructor(allItems) {
		super();
		let el = null;
		// debugger;
		this._allItems = allItems;
		
		this.app = this.getElement('#placeableController');
		
		const container = this.createElement('div', '', 'drag-items');
		const items = this.createElement('div', 'draggable-items');
		const row = this.createElement('div', 'row');
		const col = this.createElement('div', 'col');

		
		//for each Task in the list...
		this._allItems.forEach(item => {
			//create an <li> and append it to the <ul>
			let itemObject = col.appendChild(this.createElement('div', 'draggable-item', `item-header item-${item.id}`));
			itemObject.style.height = `${46 * item.height}px`;
			itemObject.style.width = `${46 * item.width}px`;
			//set the textContent to the task title
			itemObject.innerText = item.id;
			itemObject.setAttribute('draggable', true);

			// const itemHeader = this.createElement('div', 'card-header', "item-header");
			// itemHeader.innerText = item.id;
			// itemObject.append(itemHeader);
			
			//add a click event listener that calls toggleDone()
			// itemObject.addEventListener("dragstart", () => item.toggleDone());
		});
		
		
		// dragItem.append(itemHeader);
		// col.append(dragItem);
		row.append(col);
		items.append(row);
		container.append(items);
		
		
		
		this.app.appendChild(container);
	};


	 

	
}