import {BaseController, GridView, ModalComponent, Storage} from "../CROWDR";

export default class GridController extends BaseController {
	constructor(mainController) {
		super(mainController);
		this.gridView = new GridView();

		this.gridView.setGridCreatedEvent(regionForm => this.regionCreated(regionForm));
		// this.gridView.formChanged();
	}
	
	regionCreated(regionForm) {
		if (Storage.createRegion(regionForm)) {
			this.gridView.resetForm();
			new ModalComponent('Region created', 'The region was successfully created.', 'modal-sm').show();
			this.mainController.regionChanged(Storage.getRegion(regionForm.name));
		} else {
			new ModalComponent('Region not created', 'The region could not be created, please try again.', 'modal-sm').show();
		}
	}
}