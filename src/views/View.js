export default class View {
	getElement(selector) {
		return document.querySelector(selector);
	}

	createElement(tag, classes, id) {
		const element = document.createElement(tag);

		if (classes) classes.split(' ').forEach(className => element.classList.add(className));
		if (id) element.id = id;

		return element;
	}
}