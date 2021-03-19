import {TerrainView, PlaceableView, PlacebleModel, BaseController} from "../CROWDR";

export default class PlaceableController extends BaseController {

	constructor(mainController) {
		super(mainController);
		let item = new PlacebleModel();
		item.height = 15;
		item.width = 15;
		item.id = 0;

		let item2 = new PlacebleModel();
		item2.height = 15;
		item2.width = 15;
		item2.id = 1;

		let items = [item, item2];
		this.placeableView = new PlaceableView(items);


		this.addEvents();


	}


	addEvents() {
		const dropzones = document.querySelectorAll('.dropzones');
		const items = document.querySelectorAll('.draggable-item');

		let el = null;

		
		items.forEach(item =>{
			item.addEventListener('dragstart', e => {
				// debugger;
				console.log(e);
				el = e.target;
				// console.log(el);
				// el.removeAttribute('draggable');
			});
			}
		);
		

		for (var i = 0; i < dropzones.length; i++) {

			dropzones[i].addEventListener('dragover', (e) => {
				e.preventDefault();
			});

			dropzones[i].addEventListener('dragenter', (e) => {
				if (e.target.classList.contains('dropzone')) {
					e.target.classList.add('solid-border');
				}
			});

			dropzones[i].addEventListener('drop', (e) => {
				// console.log(e);
				e.preventDefault();
				e.target.appendChild(el);
				el = null;
				// e.target.classList.remove('solid-border');
			});

			dropzones[i].addEventListener('dragleave', (e) => {
				
				if (e.target.classList.contains('dropzone')) {
					e.target.classList.remove('solid-border');
				}
			});
		}
	}

}