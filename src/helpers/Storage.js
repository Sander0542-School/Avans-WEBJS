import {RegionForm} from "../CROWDR";

export default class Storage {
	static createRegion(regionForm = new RegionForm()) {
		try {
			const regions = this.getRegions();

			const objects = [];

			let id = 0;

			for (let i = 0; i < regionForm.tentCount; i++) {
				objects.push({
					id: id++,
					type: 'tent',
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

			this.saveRegions(regions);

			return true;
		} catch (e) {
			return false;
		}
	}

	static saveRegions(regions) {
		localStorage.setItem('regions', JSON.stringify(regions));
	}

	static getRegions() {
		return JSON.parse(localStorage.getItem('regions') || "[]");
	}

	static getRegion(regionName) {
		const regions = this.getRegions();

		for (let region of regions) {
			if (region.name.toUpperCase() === regionName.toUpperCase()) {
				return region;
			}
		}
		
		return null;
	}

	static placePlaceable(region, placeable) {
		if (!region || !placeable) {
			return false;
		}
		
		const regions = this.getRegions();

		let regionId = null;

		for (let i = 0; i < regions.length; i++) {
			if (regions[i].name === region.name) {
				regionId = i;
				break;
			}
		}

		if (regionId === null) {
			return false;
		}

		// Remove placeable from objects if possible
		for (let i = 0; i < regions[regionId].objects.length; i++) {
			if (regions[regionId].objects[i].id === placeable.id) {
				regions[regionId].objects.splice(i, 1);
				break;
			}
		}

		// Remove placeable from terrain if possible
		for (let i = 0; i < regions[regionId].terrain.length; i++) {
			if (regions[regionId].terrain[i].id === placeable.id) {
				regions[regionId].terrain.splice(i, 1);
				break;
			}
		}

		// Add placeable to terrain
		regions[regionId].terrain.push(placeable);
		
		this.saveRegions(regions);
		
		return true;
	}
}