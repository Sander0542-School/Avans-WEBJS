import {TerrainView, PlaceableView, PlacebleModel} from "../CROWDR";

export default class PlaceableController {

	constructor() {
		
		let item = new PlacebleModel();
		item.height = 15;
		item.width = 15;

		let item2 = new PlacebleModel();
		item2.height = 15;
		item2.width = 15;

		let items = [item, item2];
		
		this.placeableView = new PlaceableView(items);


		const dropzones = document.querySelector('.dropzones');

		let el = null;

		document
			.querySelector('.draggable-items')
			.addEventListener('dragstart', e => {
				el = e.target.cloneNode(true);
				el.removeAttribute('draggable');
			});

		dropzones.addEventListener('dragover', (e) => {
			e.preventDefault();
		});
		dropzones.addEventListener('dragenter', (e) => {
			if (e.target.classList.contains('dropzone')) {
				e.target.classList.add('solid-border');
			}
		});
		dropzones.addEventListener('drop', (e) => {
			e.preventDefault();
			e.target.appendChild(el);
			el = null;
			e.target.classList.remove('solid-border');
		});

		dropzones.addEventListener('dragleave', (e) => {
			if (e.target.classList.contains('dropzone')) {
				e.target.classList.remove('solid-border');
			}
		})

	}


	
	
}