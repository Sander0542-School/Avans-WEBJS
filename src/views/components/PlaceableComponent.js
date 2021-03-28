import {
	Component,
	FoodSettingsFormComponent,
	Storage,
	TentSettingsFormComponent,
	TrashSettingsFormComponent
} from "../../CROWDR";

export default class PlaceableComponent extends Component {
	cellSize = 46;

	constructor(region, item) {
		super();

		this.region = region;
		this.item = item;
	}

	render() {
		const element = this.createElement('div', 'draggable-item', `draggable-item-${this.item.id}`);

		const height = this.cellSize * this.item.height;
		const width = this.cellSize * this.item.width;

		element.style.height = `${height}px`;
		element.style.width = `${width}px`;

		element.dataset.id = this.item.id;
		element.dataset.type = this.item.type;
		element.dataset.width = this.item.width || "1";
		element.dataset.height = this.item.height || "1";
		element.dataset.props = JSON.stringify(this.item.props || "{}");

		const canvas = this.createElement('canvas');

		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.height = height;
		canvas.width = width;

		const canvasImage = new Image();
		canvasImage.src = `/assets/tiles/${this.item.type}.jpg`;
		
		canvasImage.onload = () => {
			const canvasContext = canvas.getContext("2d");
			canvasContext.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height, 0, 0, canvas.width, canvas.height);

			element.append(canvas);
		}
		
		let settingsComponent;
		
		switch (this.item.type) {
			case "tent":
				settingsComponent = new TentSettingsFormComponent('settingsForm', (form) => this.saveProps(element, form.getProps()), this.region, this.item);
				break;
			case "food":
				settingsComponent = new FoodSettingsFormComponent('settingsForm', (form) => this.saveProps(element, form.getProps()), this.region, this.item);
				break;
			case "trash":
				settingsComponent = new TrashSettingsFormComponent('settingsForm', (form) => this.saveProps(element, form.getProps()), this.region, this.item);
				break;
		}
		
		if (settingsComponent) {
			element.classList.add('c-pointer');
			element.addEventListener('click', () => {
				settingsComponent.updateProps(this.getProps(element));
				settingsComponent.make();
			})
		}

		element.setAttribute('draggable', true);
		element.addEventListener('dragstart', e => {
			e.dataTransfer.setData('text/plain', e.target.id);
		});

		return element;
	}
	
	getProps(element) {
		return JSON.parse(element.dataset.props);
	}
	
	saveProps(element, props) {
		Storage.saveProps(this.region, this.item, props);
		element.dataset.props = JSON.stringify(props || "{}");
	}
}