describe('Create Region', () => {
	it('Fill form', () => {
		cy.visit('/');

		cy.fixture('region/valid').then((region) => {
			cy.get('#regionName').type(region.name);
			cy.get('#regionTent').type(region.tentCount);
			cy.get('#regionFood').type(region.foodCount);
			cy.get('#regionDrink').type(region.drinkCount);
			cy.get('#regionTreeType').select(region.treeType);
			cy.get('#regionTreeCount').type(region.treeCount);
			cy.get('#regionToilet').type(region.toiletCount);
			cy.get('#regionTrashBin').type(region.trashBinCount);
		});

		cy.get('#regionSubmit').should('be.visible').click();

		cy.get('.modal.show').should('be.visible');
		cy.wait(300);
		cy.get('.modal.show button.close > span').should('be.visible').click();

		cy.get('#terrainController .nav-tabs .nav-link').should('be.visible');
		cy.visit('/');
		cy.get('#terrainController .nav-tabs .nav-link').should('be.visible');

		cy.saveLocalStorage();
	});

	it('Place items', () => {
		cy.restoreLocalStorage();
		cy.visit('/');

		cy.fixture('placeables/locations').then((locations) => {
			for (const location of locations) {
				cy.get(`#placeableController .draggable-item[data-type="${location.type}"]`)
					.should('be.visible')
					.drag(`#terrainController .dropzone[data-row="${location.row}"][data-cell="${location.cell}"]`, {
						position: "center",
						force: true
					});

				cy.get(`#terrainController .dropzone[data-row="${location.row}"][data-cell="${location.cell}"]`).children('.draggable-item').should('be.visible');
			}
		});

		cy.get('#terrainController .terrain-table .draggable-item').should('have.length', 4);
		cy.visit('/');
		cy.get('#terrainController .terrain-table .draggable-item').should('have.length', 4);

		cy.saveLocalStorage();
	});

	it('Placeable settings', () => {
		cy.restoreLocalStorage();
		cy.visit('/');

		cy.get('#placeableController .draggable-item[data-type="food"]').should('be.visible').click();

		cy.get('#settingsController input').should('be.visible').should('have.length', 2);

		cy.fixture('placeables/settings').then((settings) => {
			cy.get('#settingsMaxVisitors').clear();
			cy.get('#settingsMaxVisitors').type(settings.maxVisitors);
			cy.get('#settingsFoodType').clear();
			cy.get('#settingsFoodType').type(settings.foodType);
		});

		cy.get('#settingsSubmit').should('be.visible').click();

		cy.visit('/');

		cy.get('#placeableController .draggable-item[data-type="food"]').should('be.visible').click();

		cy.fixture('placeables/settings').then((settings) => {
			cy.get('#settingsMaxVisitors').should('contain.value', settings.maxVisitors);
			cy.get('#settingsFoodType').should('contain.value', settings.foodType);
		});
	});
})