import {SettingsFormComponent, TrashSettingsForm} from "../../../CROWDR";

export default class TrashSettingsFormComponent extends SettingsFormComponent {
	constructor(elemId, onSubmit, region, placeable) {
		super(elemId, onSubmit, region, placeable);
	}

	getForm() {
		const form = new TrashSettingsForm(this.region, this.placeable);

		form.capacity = this.getInputValue('#settingsCapacity', this.placeable.props.capacity);
		form.clearsAt = this.getInputValue('#settingsClearsAt', this.placeable.props.clearsAt);

		return form;
	}

	render(form) {
		if (super.render(form)) {
			const formElements = [];
			const formInputs = [];

			const capacityInput = this.createInput('number', 'capacity', 'settingsCapacity', form.capacity);
			formInputs.push(capacityInput);
			formElements.push(this.createFormGroup(capacityInput, 'Capacity', form.errorMessage('capacity')));

			const clearsAtInput = this.createInput('time', 'clearsAt', 'settingsClearsAt', form.clearsAt);
			formInputs.push(clearsAtInput);
			formElements.push(this.createFormGroup(clearsAtInput, 'Clears At', form.errorMessage('clearsAt')));
			
			this.addInputListeners(formInputs);

			formElements.forEach(formElement => this.getFormElement().append(formElement));

			if (form.isValid()) {
				this.getFormElement().append(this.createSubmitButton());
			}
		}
	}


}