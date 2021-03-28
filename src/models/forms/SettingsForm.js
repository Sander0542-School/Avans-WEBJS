import {Form, Storage} from "../../CROWDR";

export default class SettingsForm extends Form {
	constructor(region, placeable) {
		super();

		this.type = placeable.type;
		this.regionName = region.name;
		this.placeableId = placeable.id;
	}

	type = '';

	regionName = '';

	placeableId = '';

	validate() {
		let invalidFields = super.validate();

		if (!this.type) {
			invalidFields['type'] = 'The type is required';
		}

		if (!this.regionName) {
			invalidFields['regionName'] = 'The region is required';
		} else {
			if (!Storage.getRegion(this.regionName)) {
				invalidFields['regionName'] = 'The region does not exist';
			}
		}

		if (!this.placeableId) {
			invalidFields['placeableId'] = 'The placeable is required';
		}

		return invalidFields;
	}
	
	getProps() {
		return {};
	}
}