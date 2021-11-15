/// <reference types="cypress" />
import { menu } from "../support/PageObjects/menuNavigation"
import { singleDate } from "../support/PageObjects/datePicker"
import { dateRange } from "../support/PageObjects/datePicker"

beforeEach('Open application', () => {
    cy.openApplication()
})

describe('Datepicker Testing', () => {
    it.only('Common Datepicker Test', () => {
        menu.NavigateToDatepicker()
        singleDate.SelectDate(500)
    })

    it.only('Datepicker with Range Test', () => {
        menu.NavigateToDatepicker()
        dateRange.SelectDateRange(30, 500)
    })
})