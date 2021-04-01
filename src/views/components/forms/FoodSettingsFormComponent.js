import {SettingsFormComponent, FoodSettingsForm} from "../../../CROWDR";

export default class FoodSettingsFormComponent extends SettingsFormComponent {
	constructor(elemId, onSubmit, region, placeable) {
		super(elemId, onSubmit, region, placeable);
	}

	getForm() {
		const form = new FoodSettingsForm(this.region, this.placeable);

		form.maxVisitors = this.getInputValue('#settingsMaxVisitors', this.placeable.props.maxVisitors);
		form.foodType = this.getInputValue('#settingsFoodType', this.placeable.props.foodType);

		return form;
	}

	render(form) {
		if (super.render(form)) {
			const formElements = [];
			const formInputs = [];

			const maxVisitorsInput = this.createInput('number', 'maxVisitors', 'settingsMaxVisitors', form.maxVisitors);
			formInputs.push(maxVisitorsInput);
			formElements.push(this.createFormGroup(maxVisitorsInput, 'Maximum Visitors', form.errorMessage('maxVisitors')));

			const foodTypeInput = this.createInput('text', 'foodType', 'settingsFoodType', form.foodType);
			formInputs.push(foodTypeInput);
			formElements.push(this.createFormGroup(foodTypeInput, 'Food', form.errorMessage('foodType')));

			this.addInputListeners(formInputs);

			formElements.forEach(formElement => this.getFormElement().append(formElement));

			if (form.isValid()) {
				this.getFormElement().append(this.createSubmitButton('settingsSubmit'));
			}
		}
	}


}