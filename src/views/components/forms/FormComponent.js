import Component from "../Component";

export default class FormComponent extends Component {
	constructor(elemId, onSubmit) {
		super();

		this.formId = elemId;
		this.setSubmitEvent(onSubmit);
	}

	setSubmitEvent(callback) {
		this.onSubmit = callback;
	}

	getFormElement() {
		return this.getElement(`#${this.formId}`);
	}

	reset() {
		const formElem = this.getFormElement();
		const inputs = formElem.querySelectorAll(":scope input");
		inputs.forEach(input => input.value = null);

		this.formChanged(this.getForm());
	}

	formChanged(form) {
		this.render(form);
	}

	submitForm(form) {
		if (!form.isValid()) {
			return false;
		}

		this.onSubmit(form);
	}

	make() {
		this.getFormElement().innerHTML = '';

		return this.render(this.getForm());
	}

	render(form) {
		this.getFormElement().innerHTML = '';

		return true;
	}

	getForm() {
	}

	createSubmitButton(title = "Save") {
		const button = this.createElement('button', 'btn btn-success', 'settingsSubmit');
		button.innerText = title;
		button.addEventListener('click', () => {
			this.submitForm(this.getForm());
		});
		
		return button;
	}
	
	addInputListeners(inputs) {
		inputs.forEach(input => input.addEventListener('input', (event) => {
			const id = event.target.id;

			this.formChanged(this.getForm());

			this.getElement(`#${id}`).focus();
		}))
	}
}