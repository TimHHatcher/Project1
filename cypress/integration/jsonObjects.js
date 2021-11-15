/// <reference types="cypress" />

describe('JSON Objects', () => {

    it('JSON Objects', () => {
        cy.openApplication()

        const simpleObject = {"key1": "value1", "key2": "value2"}

        const simpleArrayOfValues = ["one", "two", "three"]

        const arrayOfObjects = [{"key1": "value1"}, {"key2": "value2"}, {"key3": "value3"}]

        const typesOfData = {"string": "This is a string", "number": 30}

        const mix = {
            "firstName": "Tim",
            "lastName": "Hatcher",
            "age": 21,
            "students": [
                {
                    "firstName": "Bob",
                    "lastName": "Bobby",
                },
                {
                    "firstName": "Twila",
                    "lastName": "Twiks"
                }
            ]
        }
        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayOfValues[1])
        console.log(arrayOfObjects[2].key3)
        console.log(mix.students[0].lastName)
    })

})