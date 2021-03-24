import {RegionForm} from "../CROWDR";

export default class Storage {
	static createRegion(regionForm = new RegionForm()) {
		try {
			let regions = JSON.parse(localStorage.getItem('regions') || "[]");

			const objects = [];

			let id = 0;

			for (let i = 0; i < regionForm.tentCount; i++) {
				objects.push({
					id: id++,
					type: 'tree',
					width: 3,
					height: 3
				})
			}

			for (let i = 0; i < regionForm.foodCount; i++) {
				objects.push({
					id: id++,
					type: 'food',
					width: 1,
					height: 1
				})
			}

			for (let i = 0; i < regionForm.drinkCount; i++) {
				objects.push({
					id: id++,
					type: 'drink',
					width: 2,
					height: 1
				})
			}

			for (let i = 0; i < regionForm.treeCount; i++) {
				let treeHeight = 1;
				let treeWidth = 1;

				switch (regionForm.treeType) {
					case 'high':
						treeHeight = 1;
						treeWidth = 1;
						break;
					case 'wide':
						treeHeight = 2;
						treeWidth = 1;
						break;
					case 'shadow':
						treeHeight = 3;
						treeWidth = 3;
						break;
				}

				objects.push({
					id: id++,
					type: 'tree_' + regionForm.treeType,
					width: treeWidth,
					height: treeHeight
				})
			}

			for (let i = 0; i < regionForm.toiletCount; i++) {
				objects.push({
					id: id++,
					type: 'toilet',
					width: 3,
					height: 1
				})
			}

			for (let i = 0; i < regionForm.trashBinCount; i++) {
				objects.push({
					id: id++,
					type: 'trash',
					width: 1,
					height: 1
				})
			}

			const region = {
				name: regionForm.name,
				objects: objects,
				terrain: []
			}

			regions.push(region);

			localStorage.setItem('regions', JSON.stringify(regions));
			
			return true;
		} catch (e) {
			return false;
		}
	}
}