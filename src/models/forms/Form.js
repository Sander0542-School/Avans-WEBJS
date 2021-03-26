import {Model} from "../../CROWDR";

export default class Form extends Model {

	isValid = (property, isFilled = false) => {
		if (property) {
			const valid = !(property in this.validate());
			
			if (isFilled) {
				if (this[property]) {
					return valid;
				}
				
				return undefined;
			}
			
			return valid;
		}
		
		return Object.keys(this.validate()).length <= 0;
	};
	
	errorMessage = property => {
		const errors = this.validate();
		const valid = !(property in errors);
		
		if (this[property] === undefined) {
			return undefined;
		}
		
		if (valid) {
			return null;
		}
		
		return errors[property];
	};

	validate = () => ({});
}
