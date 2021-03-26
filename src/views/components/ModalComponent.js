import {Component} from "../../CROWDR";

export default class ModalComponent extends Component {
	constructor(title, body, size = '') {
		super();
		
		if (typeof body === 'string' || body instanceof String) {
			const text = this.createElement('p', 'card-text');
			text.innerText = body;
			
			body = text;
		}

		this.title = title;
		this.body = body;
		this.size = size;
	}

	show() {
		const modalId = 'modal' + Math.floor(Math.random() * 4000);
		
		const modal = this.createElement('div', 'modal fade show', modalId);
		const dialog = this.createElement('div', 'modal-dialog');
		const content = this.createElement('div', 'modal-content');
		const header = this.createElement('div', 'modal-header');
		const body = this.createElement('div', 'modal-body');
		const title = this.createElement('h5', 'modal-title');
		const closeButton = this.createElement('button', 'close');
		const closeText = this.createElement('span');

		if (this.size) {
			dialog.classList.add(this.size);
		}

		title.innerText = this.title;
		closeButton.dataset.dismiss = 'modal';
		closeButton.setAttribute('aria-label', 'Close');
		closeText.setAttribute('aria-hidden', 'true');
		closeText.innerHTML = '&times;';

		closeButton.append(closeText);
		header.append(title, closeButton);
		body.append(this.body);
		content.append(header, body);
		dialog.append(content);
		modal.append(dialog);

		document.body.append(modal);
		
		// We hebben hier jQuery gebruikt, omdat het niet mogelijk is om dit met JavaScript te doen. (Volgends de regels mag dit gebruikt worden voor frameworks zoals Bootstrap)
		$('#' + modalId).on('hidden.bs.modal', () => {
			document.getElementById(modalId).remove();
		});
		$('#' + modalId).modal('show');
	};
}