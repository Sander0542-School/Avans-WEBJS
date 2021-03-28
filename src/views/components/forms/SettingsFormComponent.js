import {FormComponent} from "../../../CROWDR";

export default class SettingsFormComponent extends FormComponent {
	constructor(elemId, onSubmit, region, placeable) {
		super(elemId, onSubmit);

		this.region = region;
		this.placeable = placeable;
	}
	
	updateProps(props) {
		this.placeable.props = props;
	}

	render(form) {
		let valid = super.render(form);
		
		const errors = [];

		if (!form.isValid('type')) {
			errors.push(this.createHelpText(form.errorMessage('type'), 'settingsType'));
		}
		if (!form.isValid('regionName')) {
			errors.push(this.createHelpText(form.errorMessage('regionName'), 'settingsRegionName'));
		}
		if (!form.isValid('placeableId')) {
			errors.push(this.createHelpText(form.errorMessage('placeableId'), 'settingsPlaceableId'));
		}
		
		if (errors.length > 0) {
			const errorGroup = this.createElement('div', 'form-group');
			
			errors.forEach((error) => {
				errorGroup.append(error);
			});
			
			this.getFormElement().append(errorGroup);
			
			valid = false;
		}

		return valid;
	}
}