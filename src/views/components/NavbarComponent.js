import {Component} from "../../CROWDR";

export default class NavbarComponent extends Component {
	constructor(title, locationChanged, itemClicked) {
		super();

		this.title = title;
		this.locationChanged = locationChanged;
		this.itemClicked = itemClicked;
	}

	render() {
		this.navbar = this.createElement('nav', 'navbar navbar-expand-lg navbar-dark bg-dark');
		const title = this.createElement('a', 'navbar-brand');

		const navCollapse = this.createElement('div', 'collapse navbar-collapse', 'navbarNav');
		const navItems = this.createElement('ul', 'navbar-nav');

		const items = {
			'regions': 'Regions',
			'simulation': 'Simulations'
		}

		for (const item in items) {
			const navItem = this.createElement('li', 'nav-item');

			const navLink = this.createElement('a', 'nav-link');
			navLink.href = `#${item}`;
			navLink.innerText = items[item];
			navLink.addEventListener('click', (e) => {
				e.preventDefault();
				this.itemClicked(item);
			});

			navItem.append(navLink);
			navItems.append(navItem);
		}

		title.innerText = this.title;

		navCollapse.append(navItems);
		this.navbar.append(title, navCollapse);
		this.renderWeatherBar();

		return this.navbar;
	};

	renderWeatherBar() {
		const weatherDiv = this.createElement('div', 'my-2 my-lg-0');
		const selectWeather = this.createElement('select', 'form-control mr-sm-2', 'weather-select p-2');

		selectWeather.addEventListener('change', (e) => {
			this.locationChanged(e.target.options[e.target.selectedIndex].value);
		});

		const locations = {
			'5392171': 'San Jose',
			'2745706': 'Veldhoven',
		}

		for (const cityId in locations) {
			const locationOption = this.createElement('option');
			locationOption.value = cityId;
			locationOption.innerText = locations[cityId];

			selectWeather.append(locationOption);
		}

		weatherDiv.append(selectWeather);

		this.weatherIcon = this.createElement('img', 'weather-icon');

		this.navbar.append(weatherDiv, this.weatherIcon);
	}

	updateWeather(weather) {
		this.weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
	}
}