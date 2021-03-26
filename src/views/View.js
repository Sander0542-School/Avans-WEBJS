export default class View {
	getElement(selector) {
		return document.querySelector(selector)
	};

	getElements(selector) {
		return document.querySelectorAll(selector)
	};

	getInputValue(selector, defaultValue) {
		const input = this.getElement(selector);

		if (input) {
			return input.value
		}

		if (defaultValue) {
			return defaultValue;
		}

		return null;
	};

	createElement(tag, classes, id) {
		const element = document.createElement(tag);

		if (classes) classes.split(' ').forEach(className => element.classList.add(className));
		if (id) element.id = id;

		return element;
	};

	createInput(type, name, id, value, onchange) {
		const input = this.createElement('input', 'form-control', id);
		input.type = type;
		input.name = name;
		input.value = value;

		if (onchange) {
			input.onchange = onchange;
		}

		return input;
	};

	createSelect(name, id, options, selected) {
		const select = this.createElement('select', 'form-control', id);
		select.name = name;

		for (const key in options) {
			const value = options[key];
			select.append(this.createOption(value, key));
		}

		if (selected) {
			select.value = selected;
		}

		return select;
	};

	createOption(title, value) {
		const option = this.createElement('option');
		option.innerText = title;

		if (value) {
			option.value = value;
		}

		return option;
	};

	createFormGroup(inputElem, labelText, errorText) {
		const group = this.createElement('div', 'form-group');

		if (labelText) {
			const label = this.createElement('label');
			label.innerText = labelText;
			label.htmlFor = inputElem.id;

			group.append(label);
		}

		group.append(inputElem);

		if (errorText !== undefined) {
			const isValid = errorText === null;
			inputElem.classList.add(isValid ? 'is-valid' : 'is-invalid');

			if (!isValid && errorText) {
				const validation = this.createElement('div', '', `${inputElem.id}Help`);
				validation.innerText = errorText;
				validation.classList.add('invalid-feedback');

				group.append(validation);
			}
		}

		return group;
	};
}