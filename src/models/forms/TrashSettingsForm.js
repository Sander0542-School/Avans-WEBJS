import {SettingsForm} from "../../CROWDR";
import moment from "moment";

export default class TrashSettingsForm extends SettingsForm {
	constructor(region, placeable) {
		super(region, placeable);
	}

	capacity = 10;

	clearsAt = '04:00';

	validate() {
		const invalidFields = super.validate();
		
		if (!this.capacity) {
			invalidFields['capacity'] = 'The capacity is required';
		} else {
			if (this.capacity < 0) {
				invalidFields['capacity'] = 'The capacity cannot be below 0';
			}
		}
		
		if (!this.clearsAt) {
			invalidFields['clearsAt'] = 'The clear time is required';
		} else {
			if (!moment(this.clearsAt, 'HH:mm', true).isValid()) {
				invalidFields['clearsAt'] = 'The clears at time is not valid';
			}
		}
		
		return invalidFields;
	}


	getProps() {
		return {
			capacity: parseInt(this.capacity),
			clearsAt: this.clearsAt,
		}
	}
}