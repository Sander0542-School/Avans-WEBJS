import Controller from "./Controller";

export default class BaseController extends Controller {
	constructor(mainController) {
		super();

		this.mainController = mainController;
	}
}