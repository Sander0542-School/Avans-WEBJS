import {SettingsForm} from "../../CROWDR";
import moment from "moment";

export default class TentSettingsForm extends SettingsForm {
	constructor(region, placeable) {
		super(region, placeable);
	}

	maxVisitors = 0;
	
	opensAt = '12:00'
	
	closesAt = '03:00'

	validate() {
		const invalidFields = super.validate();
		
		if (!this.maxVisitors) {
			invalidFields['maxVisitors'] = 'The maximum visitors is required';
		} else {
			if (this.maxVisitors < 1) {
				invalidFields['maxVisitors'] = 'The maximum visitors cannot be below 1';
			}
		}
		
		if (!this.opensAt) {
			invalidFields['opensAt'] = 'The opening time is required';
		} else {
			if (!moment(this.opensAt, "HH:mm", true).isValid()) {
				invalidFields['opensAt'] = 'The opens at time is not valid';
			}
		}
		
		if (!this.closesAt) {
			invalidFields['closesAt'] = 'The closing time is required';
		} else {
			if (!moment(this.closesAt, "HH:mm", true).isValid()) {
				invalidFields['closesAt'] = 'The opens at time is not valid';
			}
		}
		
		return invalidFields;
	}


	getProps() {
		return {
			maxVisitors: parseInt(this.maxVisitors),
			opensAt: this.opensAt,
			closesAt: this.closesAt,
		}
	}
}