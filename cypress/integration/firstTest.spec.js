/// <reference types="cypress" />

describe('Our first suite', () => {

    it('first test', () => {
        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Form Layouts"]').click()
        cy.get('[data-cy="imputEmail1"]')
    })

    it('Second test', () => {
        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Form Layouts"]').click()
        cy.contains('nb-card','Basic form')
            .find('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
    })

    it('Third test', () => {
        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Form Layouts"]').click()

        cy.contains('nb-card', 'Basic form').then(firstForm => {
            const emailText = firstForm.find('[for="exampleInputEmail1"]').text()
            const passwordText = firstForm.find('[for="exampleInputPassword1"]').text()
            expect(emailText).to.equal('Email address')
            expect(passwordText).to.equal('Password')

            cy.contains('nb-card', 'Using the Grid').then(secondForm => {
                const passwordText = secondForm.find('[for="inputPassword2"]').text()
                expect(passwordText).to.equal('Password')
                cy.wrap(secondForm).find('[for="inputPassword2"]').should('contain', 'Password')
            })
        })
    })

    it('Invoke command', () => {
        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Form Layouts"]').click()

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
    })

    it('Invoke command part 2', () => {

        function selectDate(numDays){
            let date = new Date()
            date.setDate(date.getDate() + numDays)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + futureYear
            cy.log(dateAssert)
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if(dateAttribute.includes(futureMonth) && dateAttribute.includes(futureYear)){
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()    
                } else {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDate(numDays)    
                }
            })
            return dateAssert
        }

        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Datepicker"]').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDate(500)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)  
        })

    })

    it('radio button', () => {
        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Form Layouts"]').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})  //forces selection of hidden element
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.get('[title="Forms"]').click()
        cy.get('[title="Modal & Overlays"]').click()
        cy.get('[title="Toastr"]').click()

        // cy.get('[type="checkbox"').eq(0).click({force: true})
        // cy.get('[type="checkbox"').eq(2).click({force: true})
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').uncheck({force: true})

    })

    it('dropdowns', () => {
        cy.visit('/')
        
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').click().should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('ul nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if(index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })

    })

    it('tables', () => {
        cy.visit('/')
        cy.get('[title="Tables & Data"]').click()
        cy.get('[title="Smart Table"]').click()
        
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

        })

        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Tim')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Hatcher')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Tim')
            cy.wrap(tableColumns).eq(3).should('contain', 'Hatcher')
        })

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })

    })

    it.only('Tooltips', () => {

        cy.visit('/')
        cy.get('[title="Modal & Overlays"]').click()
        cy.get('[title="Tooltip"]').click()

        cy.contains('nb-card', 'Colored Tooltips').find('button').then(buttons => {
            cy.wrap(buttons)
                .contains('Default').click()
            cy.get('nb-tooltip').should('contain', 'This is a tooltip')  //This tag only displays after the button click
        })

    })

})