describe('Start Simulation', () => {
	it('Fill form', () => {
		cy.visit('/');

		cy.fixture('region/valid_simulation').then((region) => {
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

		cy.fixture('placeables/simulation_locations').then((locations) => {
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

		cy.get('#terrainController .terrain-table .draggable-item').should('have.length', 6);

		cy.saveLocalStorage();
	});


	it('Lock region', () => {
		cy.restoreLocalStorage();
		cy.visit('/');
		cy.get(`#lock-region`).should('be.visible');
		cy.get(`#lock-region`).click();
		cy.wait(1000);
		cy.get(`#lock-region`).should('not.exist');
		cy.saveLocalStorage();
	});

	it('Visit Simulation', () => {
		cy.restoreLocalStorage();
		cy.visit('/#simulation');

		cy.get('.row .simulation-list').contains('Simulatie');
		cy.get('.simulation-canvas').should('be.visible');


		cy.saveLocalStorage();
	});


	it('Change Line Count', () => {
		cy.restoreLocalStorage();
		cy.visit('/#simulation');

		cy.get(`#add-line`).should('be.visible');
		cy.get(`#add-line`).click();
		cy.get('#line-table').find('tr').should('have.length', 5);


		cy.get(`#remove-line`).should('be.visible');
		cy.get(`#remove-line`).click();
		cy.get('#line-table').find('tr').should('have.length', 4);


		cy.saveLocalStorage();
	});


	it('Check Elements', () => {
		cy.restoreLocalStorage();
		cy.visit('/#simulation');
		
		cy.get(`#lineSettings`).should('be.visible');
		cy.get(`#line-table`).should('be.visible');
		cy.get(`#information-card`).should('exist');
		
		cy.saveLocalStorage();
	});
});