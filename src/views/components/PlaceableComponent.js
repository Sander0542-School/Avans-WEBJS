import {Component} from "../../CROWDR";

export default class PlaceableComponent extends Component {
	constructor(item) {
		super();
		
		this.item = item;
	}
	
	render() {
		const element = this.createElement('div', 'draggable-item', `draggable-item-${this.item.id}`);
		element.style.height = `${46 * this.item.height}px`;
		element.style.width = `${46 * this.item.width}px`;
		element.innerText = this.item.type;
		element.setAttribute('draggable', true);
		element.dataset.id = this.item.id;
		element.dataset.type = this.item.type;
		element.dataset.width = this.item.width;
		element.dataset.height = this.item.height;
		
		return element
	}
}