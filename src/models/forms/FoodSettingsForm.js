import {SettingsForm} from "../../CROWDR";

export default class FoodSettingsForm extends SettingsForm {
	constructor(region, placeable) {
		super(region, placeable);
	}

	maxVisitors = 0;

	foodType = 'Burgers'

	validate() {
		const invalidFields = super.validate();
		
		if (!this.maxVisitors) {
			invalidFields['maxVisitors'] = 'The maximum visitors is required';
		} else {
			if (this.maxVisitors < 1) {
				invalidFields['maxVisitors'] = 'The maximum visitors cannot be below 1';
			}
		}
		
		if (!this.foodType) {
			invalidFields['foodType'] = 'The food type is required';
		}
		
		return invalidFields;
	}


	getProps() {
		return {
			maxVisitors: parseInt(this.maxVisitors),
			foodType: this.foodType,
		}
	}
}