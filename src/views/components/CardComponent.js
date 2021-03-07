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

		body.append(title, this.content);
		card.append(body);

		return card;
	}
}