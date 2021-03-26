import {Component} from "../../CROWDR";

export default class PlaceableComponent extends Component {
	cellSize = 46;

	constructor(item) {
		super();

		this.item = item;
	}

	render() {
		const element = this.createElement('div', 'draggable-item', `draggable-item-${this.item.id}`);

		element.style.height = `${this.cellSize * this.item.height}px`;
		element.style.width = `${this.cellSize * this.item.width}px`;

		element.dataset.id = this.item.id;
		element.dataset.type = this.item.type;
		element.dataset.width = this.item.width;
		element.dataset.height = this.item.height;

		const canvas = this.createElement('canvas');

		canvas.style.width = '100%';
		canvas.style.height = '100%';

		const canvasImage = new Image(this.cellSize, this.cellSize);
		canvasImage.src = "https://www.w3schools.com/html/img_the_scream.jpg";

		const canvasContext = canvas.getContext("2d");
		canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height, 0, 0, canvas.width, canvas.height);

		element.append(canvas);

		element.setAttribute('draggable', true);
		element.addEventListener('dragstart', e => {
			e.dataTransfer.setData('text/plain', e.target.id);
		});

		return element;
	}
}