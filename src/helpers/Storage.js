export default class Storage {
	static createRegion(regionForm) {
		try {
			const regions = this.getRegions();

			const objects = [];
			const terrains = [];

			let id = 1;

			for (let i = 0; i < regionForm.tentCount; i++) {
				objects.push({
					id: id++,
					type: 'tent',
					width: 3,
					height: 3,
					props: {
						maxVisitors: 10,
						opensAt: "12:00",
						closesAt: "03:00"
					}
				});
			}

			for (let i = 0; i < regionForm.foodCount; i++) {
				objects.push({
					id: id++,
					type: 'food',
					width: 1,
					height: 1,
					props: {
						maxVisitors: 10,
						foodType: 'Burgers'
					}
				});
			}

			for (let i = 0; i < regionForm.drinkCount; i++) {
				objects.push({
					id: id++,
					type: 'drink',
					width: 2,
					height: 1,
					props: {}
				});
			}

			for (let i = 0; i < regionForm.toiletCount; i++) {
				objects.push({
					id: id++,
					type: 'toilet',
					width: 3,
					height: 1,
					props: {}
				});
			}

			for (let i = 0; i < regionForm.trashBinCount; i++) {
				objects.push({
					id: id++,
					type: 'trash',
					width: 1,
					height: 1,
					props: {
						capacity: 10,
						clearsAt: '04:00'
					}
				});
			}

			const freeFields = [];
			for (let row = 1; row <= 13; row++) {
				for (let cell = 1; cell <= 13; cell++) {
					freeFields.push({
						row: row,
						cell: cell
					});
				}
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

				let field;
				while (field === undefined) {
					const nextField = freeFields[Math.floor(Math.random() * freeFields.length)];
					let success = true;

					for (let rowId = nextField.row; rowId < nextField.row + treeHeight; rowId++) {
						for (let cellId = nextField.cell; cellId < nextField.cell + treeWidth; cellId++) {
							if (freeFields.filter(value => value.row === rowId && value.cell === cellId).length === 0) {
								success = false;
							}
						}
					}

					if (success) {
						for (let rowId = nextField.row; rowId < nextField.row + treeHeight; rowId++) {
							for (let cellId = nextField.cell; cellId < nextField.cell + treeWidth; cellId++) {
								freeFields.splice(freeFields.indexOf({
									row: rowId,
									cell: cellId
								}), 1);
							}
						}
						
						field = nextField;
					}
				}

				terrains.push({
					id: id++,
					type: 'tree_' + regionForm.treeType,
					row: field.row,
					cell: field.cell,
					width: treeWidth,
					height: treeHeight,
					props: {}
				});
			}

			const region = {
				name: regionForm.name,
				locked: false,
				objects: objects,
				terrain: terrains
			}

			regions.push(region);

			this.saveRegions(regions);

			return true;
		} catch (e) {
			return false;
		}
	};

	static saveRegions(regions) {
		try {
			localStorage.setItem('regions', JSON.stringify(regions));

			return true;
		} catch (e) {
			return false;
		}
	};

	static getRegions() {
		return JSON.parse(localStorage.getItem('regions') || "[]")
	};

	static getRegion(regionName) {
		const regions = this.getRegions();

		for (let region of regions) {
			if (region.name.toUpperCase() === regionName.toUpperCase()) {
				return region;
			}
		}

		return null;
	};

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
	};

	static saveProps(region, placeable, props) {
		if (!region || !placeable || !props) {
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

		// Update placeable in objects if possible
		for (let i = 0; i < regions[regionId].objects.length; i++) {
			if (regions[regionId].objects[i].id === placeable.id) {
				regions[regionId].objects[i].props = props;
				break;
			}
		}

		// Update placeable in terrain if possible
		for (let i = 0; i < regions[regionId].terrain.length; i++) {
			if (regions[regionId].terrain[i].id === placeable.id) {
				regions[regionId].terrain[i].props = props;
				break;
			}
		}

		this.saveRegions(regions);

		return true;
	};

	static lockRegion(region, locked = true) {
		if (!region) {
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

		regions[regionId].locked = locked;

		this.saveRegions(regions);

		return true;
	}
}