import {SettingsFormComponent, TentSettingsForm} from "../../../CROWDR";

export default class TentSettingsFormComponent extends SettingsFormComponent {
	constructor(elemId, onSubmit, region, placeable) {
		super(elemId, onSubmit, region, placeable);
	}

	getForm() {
		const form = new TentSettingsForm(this.region, this.placeable);

		form.maxVisitors = this.getInputValue('#settingsMaxVisitors', this.placeable.props.maxVisitors);
		form.opensAt = this.getInputValue('#settingsOpensAt', this.placeable.props.opensAt);
		form.closesAt = this.getInputValue('#settingsClosesAt', this.placeable.props.closesAt);

		return form;
	}

	render(form) {
		if (super.render(form)) {
			const formElements = [];
			const formInputs = [];

			const maxVisitorsInput = this.createInput('number', 'maxVisitors', 'settingsMaxVisitors', form.maxVisitors);
			formInputs.push(maxVisitorsInput);
			formElements.push(this.createFormGroup(maxVisitorsInput, 'Maximum Visitors', form.errorMessage('maxVisitors')));

			const opensAtInput = this.createInput('time', 'opensAt', 'settingsOpensAt', form.opensAt);
			formInputs.push(opensAtInput);
			formElements.push(this.createFormGroup(opensAtInput, 'Opens At', form.errorMessage('opensAt')));

			const closesAtInput = this.createInput('time', 'closesAt', 'settingsClosesAt', form.closesAt);
			formInputs.push(closesAtInput);
			formElements.push(this.createFormGroup(closesAtInput, 'Closes At', form.errorMessage('closesAt')));
			
			this.addInputListeners(formInputs);

			formElements.forEach(formElement => this.getFormElement().append(formElement));

			if (form.isValid()) {
				this.getFormElement().append(this.createSubmitButton());
			}
		}
	}


}