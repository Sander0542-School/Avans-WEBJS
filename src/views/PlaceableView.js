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

		

		// const dragItem = this.createElement('div', 'card bg-light my-3');
		// dragItem.setAttribute('draggable', true);
		//
		// dragItem.addEventListener('dragstart', e => {
		// 	el = e.target.cloneNode(true)
		// });
		
		



		//for each Task in the list...
		this._allItems.forEach(item => {
			//create an <li> and append it to the <ul>
			let itemObject = col.appendChild(this.createElement('div', 'card-header', 'item-header'));
			//set the textContent to the task title
			itemObject.textContent = item.title;
			itemObject.setAttribute('draggable', true);

			const itemHeader = this.createElement('div', 'card-header', 'item-header');
			itemHeader.innerText = item.width;
			itemObject.append(itemHeader);
			
			//add a click event listener that calls toggleDone()
			itemObject.addEventListener("dragstart", () => item.toggleDone());
		});
		
		
		
		// dragItem.append(itemHeader);
		// col.append(dragItem);
		row.append(col);
		items.append(row);
		container.append(items);
		
		
		
		this.app.appendChild(container);
	};


	 

	
}