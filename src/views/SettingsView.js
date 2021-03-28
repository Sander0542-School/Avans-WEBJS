import {View} from "../CROWDR";

export default class SettingsView extends View {
	constructor() {
		super();

		this.app = this.getElement('#settingsController');

		const form = this.createElement('div', '', 'settingsForm');
		this.app.append(form);
	}
}