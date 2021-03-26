import {Component} from "../../CROWDR";

export default class PlaceableComponent extends Component {
	cellSize = 46;
	
	constructor(item) {
		super();
		
		this.item = item;
	}
	
	render() {
		const element = this.createElement('div', 'draggable-item', `draggable-item-${this.item.id}`);
		
		element.innerText = this.item.type;
		
		element.style.height = `${this.cellSize * this.item.height}px`;
		element.style.width = `${this.cellSize * this.item.width}px`;
		
		element.dataset.id = this.item.id;
		element.dataset.type = this.item.type;
		element.dataset.width = this.item.width;
		element.dataset.height = this.item.height;

		element.setAttribute('draggable', true);
		element.addEventListener('dragstart', e => {
			e.dataTransfer.setData('text/plain', e.target.id);
		});
		
		return element;
	}
}