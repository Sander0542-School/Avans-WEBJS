import {Component} from "../../CROWDR";

export default class NavbarComponent extends Component {
	constructor(title, locationChanged) {
		super();

		this.title = title;
		this.locationChanged = locationChanged;
	}

	render() {
		this.navbar = this.createElement('nav', 'navbar navbar-light bg-light')
		const title = this.createElement('a', 'navbar-brand');

		title.href = '#';
		title.innerText = this.title;

		this.navbar.append(title);
		this.renderWeatherBar();

		return this.navbar;
	};

	renderWeatherBar(){
		const selectWeather = this.createElement('select', 'form-select', 'weather-select p-2');

		selectWeather.addEventListener('change', (e) => {
			this.locationChanged(e.target.options[e.target.selectedIndex].value);
		});

		const selectWeatherItem = this.createElement('option');
		selectWeatherItem.value = '5392171';
		selectWeatherItem.innerText = 'San Jose';

		const selectWeatherItem2 = this.createElement('option');
		selectWeatherItem2.value = '2745706';
		selectWeatherItem2.innerText = 'Veldhoven';

		selectWeather.append(selectWeatherItem, selectWeatherItem2);
		this.navbar.append(selectWeather);
	}
}