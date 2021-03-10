import {Form} from "../../CROWDR";

export default class RegionForm extends Form {
	name = '';

	tentCount = 1;

	foodCount = 1;

	drinkCount = 1;

	treeCount = 1;

	treeType = 1;

	toiletCount = 1;

	trashBinCount = 1;
	
	getRegionSize() {
		return 15*15;
	}

	getFilledFieldCount() {
		let fieldsFilled = 0;

		if (this.tentCount) {
			fieldsFilled += this.tentCount * 9;
		}
		if (this.foodCount) {
			fieldsFilled += this.foodCount * 1;
		}
		if (this.drinkCount) {
			fieldsFilled += this.drinkCount * 2;
		}
		if (this.treeType && this.treeCount) {
			let treeSize = 1;
			switch (this.treeType) {
				case 'high':
					treeSize = 1;
					break;
				case 'wide':
					treeSize = 2;
					break;
				case 'shadow':
					treeSize = 9;
					break;
			}

			fieldsFilled += this.treeCount * treeSize;
		}
		if (this.toiletCount) {
			fieldsFilled += this.toiletCount * 3;
		}
		if (this.trashBinCount) {
			fieldsFilled += this.trashBinCount * 1;
		}

		return fieldsFilled;
	}

	getPercentageFilled() {
		return 100 / this.getRegionSize() * this.getFilledFieldCount();
	}

	getPercentageLeft() {
		return 100 - this.getPercentageFilled();
	}
	
	getMaximumTrashBins() {
		return Math.round(this.getPercentageLeft() / 20);
	}

	validate() {
		let invalidFields = {};

		if (!this.name) {
			invalidFields['name'] = 'The name is required';
		}

		if (!this.tentCount) {
			invalidFields['tentCount'] = 'The tent count is required';
		} else {
			if (this.tentCount < 0) {
				invalidFields['tentCount'] = 'The tent count cannot be below 0';
			}
		}

		if (!this.foodCount) {
			invalidFields['foodCount'] = 'The food stall count is required';
		} else {
			if (this.foodCount < 0) {
				invalidFields['foodCount'] = 'The food stall count cannot be below 0';
			}

			const maxFoodCount = (this.tentCount && this.tentCount > 0) ? 3 : 6;

			if (this.foodCount > maxFoodCount) {
				invalidFields['foodCount'] = `There cannot be more than ${maxFoodCount} food stalls`;
			}
		}

		if (!this.drinkCount) {
			invalidFields['drinkCount'] = 'The drink stall count is required';
		} else {
			if (this.drinkCount < 0) {
				invalidFields['drinkCount'] = 'The drink stall count cannot be below 0';
			}

			const maxDrinkCount = (this.tentCount && this.tentCount > 0) ? 2 : 4;

			if (this.drinkCount > maxDrinkCount) {
				invalidFields['drinkCount'] = `There cannot be more than ${maxDrinkCount} drink stalls`;
			}
		}

		if (!this.treeCount) {
			invalidFields['treeCount'] = 'The tree count is required';
		} else {
			if (this.treeCount < 0) {
				invalidFields['treeCount'] = 'The tree count cannot be below 0';
			}
		}

		if (!this.treeType) {
			invalidFields['treeType'] = 'The tree type is required';
		} else {
			switch (this.treeType) {
				case 'high':
				case 'wide':
				case 'shadow':
					break;
				default:
					invalidFields['treeType'] = 'The selected tree type is not valid';
					break;
			}
		}

		if (!this.toiletCount) {
			invalidFields['toiletCount'] = 'The toilet count is required';
		} else {
			if (this.toiletCount < 0) {
				invalidFields['toiletCount'] = 'The toilet count cannot be below 0';
			}

			const maxToiletCount = 5

			if (this.toiletCount > maxToiletCount) {
				invalidFields['toiletCount'] = `There cannot be more than ${maxToiletCount} toilets`;
			}
		}

		if (!this.trashBinCount) {
			invalidFields['trashBinCount'] = 'The trash bin count is required';
		} else {
			if (this.trashBinCount < 0) {
				invalidFields['trashBinCount'] = 'The trash bin count cannot be below 0';
			}

			const maxTrashBinCount = this.getMaximumTrashBins()

			if (this.trashBinCount > maxTrashBinCount) {
				invalidFields['trashBinCount'] = `There cannot be more than ${maxTrashBinCount} trash bins`;
			}
		}

		return invalidFields;
	}
}