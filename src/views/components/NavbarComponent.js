import {Component} from "../../CROWDR";

export default class NavbarComponent extends Component {
	constructor(title) {
		super();

		this.title = title;
	}

	render() {
		const navbar = this.createElement('nav', 'navbar navbar-light bg-light')
		const title = this.createElement('a', 'navbar-brand');

		title.href = '#';
		title.innerText = this.title;

		navbar.appendChild(title);

		return navbar;
	}
}