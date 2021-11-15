function daysInFuture(numDays){
    let date = new Date()
    date.setDate(date.getDate() + numDays)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {month: 'short'})
    let futureYear = date.getFullYear()
    let dateAssert = futureMonth + ' ' + futureDay + ', ' + futureYear
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if(dateAttribute.includes(futureMonth) && dateAttribute.includes(futureYear)){
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()    
        } else {
            cy.get('[data-name="chevron-right"]').click()
            daysInFuture(numDays)    
        }
    })
    return dateAssert
}

class CommonDatePicker {
    SelectDate(numDays) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = daysInFuture(numDays)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)  
        })
    }
}

class RangeDatePicker {
    SelectDateRange(startDays, endDays) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            let startDate = daysInFuture(startDays)
            let endDate = daysInFuture(endDays)
            let dateAssert = startDate + " - " + endDate
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)  
        })
    }
}

export const singleDate = new CommonDatePicker()
export const dateRange = new RangeDatePicker()