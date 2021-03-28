import {BaseController, SettingsView} from "../CROWDR";

export default class SettingsController extends BaseController {
	constructor(mainController) {
		super(mainController);
		
		this.settingsView = new SettingsView();
	}
}