import {CardComponent, NavbarComponent, RegionForm, View} from "../CROWDR";

export default class GridView extends View {
	constructor() {
		super();

		this.app = this.getElement('#gridController');

		const form = this.createElement('div', '', 'gridForm');

		this.app.appendChild(form);
	}

	resetForm() {
		const inputs = this.getElements('#gridForm input');
		inputs.forEach(input => input.value = null);

		this.formChanged();
	}
	
	getRegionForm() {
		const regionForm = new RegionForm();
		regionForm.name = this.getInputValue('#regionName');
		regionForm.tentCount = this.getInputValue('#regionTent');
		regionForm.foodCount = this.getInputValue('#regionFood');
		regionForm.drinkCount = this.getInputValue('#regionDrink');
		regionForm.treeCount = this.getInputValue('#regionTreeCount');
		regionForm.treeType = this.getInputValue('#regionTreeType', 'high');
		regionForm.toiletCount = this.getInputValue('#regionToilet');
		regionForm.trashBinCount = this.getInputValue('#regionTrashBin');
		
		return regionForm;
	}
	
	submitForm() {
		const regionForm = this.getRegionForm();
		
		if (!regionForm.isValid()) {
			return false;
		}
	}

	formChanged() {
		const formElem = this.getElement('#gridForm');

		const regionForm = this.getRegionForm();

		formElem.innerHTML = '';
		const formElements = [];
		const formInputs = [];

		const nameInput = this.createInput('text', 'name', 'regionName', regionForm.name);
		formInputs.push(nameInput);
		formElements.push(this.createFormGroup(nameInput, 'Name', regionForm.errorMessage('name')));

		if (regionForm.isValid('name')) {
			const tentInput = this.createInput('number', 'tentCount', 'regionTent', regionForm.tentCount);
			formInputs.push(tentInput);
			formElements.push(this.createFormGroup(tentInput, 'Tent Count (3x3)', regionForm.errorMessage('tentCount')));

			if (regionForm.isValid('tentCount')) {
				const foodInput = this.createInput('number', 'foodCount', 'regionFood', regionForm.foodCount);
				formInputs.push(foodInput);
				formElements.push(this.createFormGroup(foodInput, 'Food Count (1x1)', regionForm.errorMessage('foodCount')));

				const drinkInput = this.createInput('number', 'drinkCount', 'regionDrink', regionForm.drinkCount);
				formInputs.push(drinkInput);
				formElements.push(this.createFormGroup(drinkInput, 'Drink Count (1x2)', regionForm.errorMessage('drinkCount')));

				if (regionForm.isValid('foodCount') && regionForm.isValid('drinkCount')) {
					const treeTypeSelect = this.createSelect('treeType', 'regionTreeType', {
						high: 'High tree (1x1)',
						wide: 'Wide tree (2x1)',
						shadow: 'Shadow tree (3x3)'
					}, regionForm.treeType);
					formInputs.push(treeTypeSelect);
					formElements.push(this.createFormGroup(treeTypeSelect, 'Tree Type', regionForm.errorMessage('treeType')));

					if (regionForm.isValid('treeType')) {
						const treeCountInput = this.createInput('number', 'treeCount', 'regionTreeCount', regionForm.treeCount);
						formInputs.push(treeCountInput);
						formElements.push(this.createFormGroup(treeCountInput, 'Tree Count', regionForm.errorMessage('treeCount')));

						if (regionForm.isValid('treeCount')) {
							const toiletInput = this.createInput('number', 'toiletCount', 'regionToilet', regionForm.toiletCount);
							formInputs.push(toiletInput);
							formElements.push(this.createFormGroup(toiletInput, 'Toilet Count (1x3)', regionForm.errorMessage('toiletCount')));

							if (regionForm.isValid('toiletCount')) {
								const trashBinInput = this.createInput('number', 'trashBinCount', 'regionTrashBin', regionForm.trashBinCount);
								formInputs.push(trashBinInput);
								formElements.push(this.createFormGroup(trashBinInput, 'Trash Bin Count (1x1)', regionForm.errorMessage('trashBinCount')));
							}
						}
					}
				}
			}
		}

		formInputs.forEach(formInput => formInput.addEventListener('input', (event) => {
			const id = event.target.id;

			this.formChanged();

			this.getElement(`#${id}`).focus();
		}))

		formElements.forEach(formElement => formElem.appendChild(formElement));

		if (regionForm.isValid()) {
			const submitButton = this.createElement('button', 'btn btn-success', 'regionSubmit');
			submitButton.innerText = "Create";
			submitButton.addEventListener('click', () => {
				this.submitForm();
			});

			formElem.appendChild(submitButton);
		}

		const resetButton = this.createElement('button', 'btn btn-danger float-right');
		resetButton.innerText = "Reset";
		resetButton.addEventListener('click', () => {
			this.resetForm();
		});

		formElem.appendChild(resetButton);
	}
}