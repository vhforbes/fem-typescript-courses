//* keyof

type DatePropertyNames = keyof Date

type DateStringPropertyNames = DatePropertyNames & string
type DateSymbolPropertyNames = DatePropertyNames & symbol

const contact = {
  name: 'Ashley',
  email: 'ashley@email.com',
}

// If I want to get the valid keys of the object I could do this:
type WhatIWant = 'name' | 'email'

// Or I can use keyof and gett like this:
type TypeOfContact = typeof contact // First gets the type
type WhatIWantImproved = keyof TypeOfContact // Then Get the Key types
type WhatIWantImprovedV2 = keyof typeof contact // Can use both in the same line!

//* typeof
async function main() {
  const apiResponse = await Promise.all([
    fetch('https://example.com'),
    Promise.resolve('Titanium White'),
  ])
  type ApiResponseType = typeof apiResponse // Creates a variable of the type according to what the apiResponse returns
}

// ?^ note: type alias within a function scope!
const MyRule = CSSRule // Getting the Class and its prototypes
CSSRule.STYLE_RULE
const myAjax = new MyRule()

type MyRuleType = typeof MyRule

//* Indexed Access Types

interface Car {
  make: string
  model: string
  year: number
  color: {
    red: string
    green: string
    blue: string
  }
}

let carColor: Car['color'] //✔️ Reaching for something that exists
let carSomething: Car['not-something-on-car'] //! Reaching for something invalid
let carColorRedComponent: Car['color']['red'] //✔️ Reaching for something nested
let carProperty: Car['color' | 'year'] // ✔️ Passing a union type through the index

//* Use case: the type registry pattern

// See:
import('./09-type-registry/')

/**/
export default {}
