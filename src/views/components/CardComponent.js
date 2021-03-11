import {Component} from "../../CROWDR";

export default class CardComponent extends Component {
	constructor(title, content) {
		super();
		
		this.title = title;
		this.content = content;
	}
	
	render() {
		const card = this.createElement('div', 'card my-4');
		const body = this.createElement('div', 'card-body');
		const title = this.createElement('h5', 'card-title');

		title.innerText = this.title;

		body.appendChild(title);
		body.appendChild(this.content);
		card.appendChild(body);

		return card;
	}
}