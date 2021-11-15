class MenuNavigation {
    NavigateToDatepicker() {
        cy.get('[title="Forms"').click()
        cy.get('[title="Datepicker"').click()
    }
}

export const menu = new MenuNavigation()