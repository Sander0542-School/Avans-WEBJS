import {FormComponent, RegionForm} from "../../../CROWDR";

export default class RegionFormComponent extends FormComponent {

	render(form) {
		super.render(form);
		
		const formElements = [];
		const formInputs = [];

		const nameInput = this.createInput('text', 'name', 'regionName', form.name);
		formInputs.push(nameInput);
		formElements.push(this.createFormGroup(nameInput, 'Name', form.errorMessage('name')));

		if (form.isValid('name')) {
			const tentInput = this.createInput('number', 'tentCount', 'regionTent', form.tentCount);
			formInputs.push(tentInput);
			formElements.push(this.createFormGroup(tentInput, 'Tent Count (3x3)', form.errorMessage('tentCount')));

			if (form.isValid('tentCount')) {
				const foodInput = this.createInput('number', 'foodCount', 'regionFood', form.foodCount);
				formInputs.push(foodInput);
				formElements.push(this.createFormGroup(foodInput, 'Food Count (1x1)', form.errorMessage('foodCount')));

				const drinkInput = this.createInput('number', 'drinkCount', 'regionDrink', form.drinkCount);
				formInputs.push(drinkInput);
				formElements.push(this.createFormGroup(drinkInput, 'Drink Count (1x2)', form.errorMessage('drinkCount')));

				if (form.isValid('foodCount') && form.isValid('drinkCount')) {
					const treeTypeSelect = this.createSelect('treeType', 'regionTreeType', {
						high: 'High tree (1x1)',
						wide: 'Wide tree (2x1)',
						shadow: 'Shadow tree (3x3)'
					}, form.treeType);
					formInputs.push(treeTypeSelect);
					formElements.push(this.createFormGroup(treeTypeSelect, 'Tree Type', form.errorMessage('treeType')));

					if (form.isValid('treeType')) {
						const treeCountInput = this.createInput('number', 'treeCount', 'regionTreeCount', form.treeCount);
						formInputs.push(treeCountInput);
						formElements.push(this.createFormGroup(treeCountInput, 'Tree Count', form.errorMessage('treeCount')));

						if (form.isValid('treeCount')) {
							const toiletInput = this.createInput('number', 'toiletCount', 'regionToilet', form.toiletCount);
							formInputs.push(toiletInput);
							formElements.push(this.createFormGroup(toiletInput, 'Toilet Count (1x3)', form.errorMessage('toiletCount')));

							if (form.isValid('toiletCount')) {
								const trashBinInput = this.createInput('number', 'trashBinCount', 'regionTrashBin', form.trashBinCount);
								formInputs.push(trashBinInput);
								formElements.push(this.createFormGroup(trashBinInput, 'Trash Bin Count (1x1)', form.errorMessage('trashBinCount')));
							}
						}
					}
				}
			}
		}

		this.addInputListeners(formInputs);

		formElements.forEach(formElement => this.getFormElement().append(formElement));

		if (form.isValid()) {
			this.getFormElement().append(this.createSubmitButton('regionSubmit', "Create"));
		}

		const resetButton = this.createElement('button', 'btn btn-danger float-right');
		resetButton.innerText = "Reset";
		resetButton.addEventListener('click', () => {
			this.reset();
		});

		this.getFormElement().append(resetButton);
	}

	getForm() {
		const form = new RegionForm();
		form.name = this.getInputValue('#regionName');
		form.tentCount = this.getInputValue('#regionTent');
		form.foodCount = this.getInputValue('#regionFood');
		form.drinkCount = this.getInputValue('#regionDrink');
		form.treeCount = this.getInputValue('#regionTreeCount');
		form.treeType = this.getInputValue('#regionTreeType', 'high');
		form.toiletCount = this.getInputValue('#regionToilet');
		form.trashBinCount = this.getInputValue('#regionTrashBin');

		return form;
	}
}