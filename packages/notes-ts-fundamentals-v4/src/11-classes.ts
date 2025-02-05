//* Classes

//? Field types
class Car {
  //? static member fields
  // private static nextSerialNumber: number
  static #nextSerialNumber: number
  static #generateSerialNumber() {
    return this.#nextSerialNumber++
    //      ^? tyeof Car, different than the type would be if car = new Car()
    //
  }

  //? static blocks
  // There's some work to be done here so this would work, we don't want to create a new car for example if isNot ready. Could create a promise to only create instance of class when is ready or pooling.
  static isReady = false
  static {
    // `this` is the static scope
    fetch('https://api.example.com/vin_number_data')
      .then((response) => response.json())
      .then((data) => {
        this.#nextSerialNumber = data.mostRecentInvoiceId + 1
        this.isReady = true
      })
  }

  make: string
  model: string
  year: number
  // serialNumber = Car.generateSerialNumber()
  // private _serialNumber = Car.generateSerialNumber() // Read only property, only subclasses can read it
  //^? Access modifyer
  readonly #serialNumber = Car.#generateSerialNumber()
  //# makes it private as well

  protected get serialNumber() {
    return this.#serialNumber
  }
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  //? method types
  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }

  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }

  equals(other: unknown) {
    if (
      other &&
      typeof other === 'object' &&
      #serialNumber in other
    ) {
      other
      // ^? TS knows this is Car because only Car class can access this #serialNumber field
      return other.#serialNumber === this.#serialNumber
    }
    return false
  }

  // Cant do this beacuse readonly
  changeSerialNumber(num: number) {
    this.#serialNumber = num
  }
}

let sedan = new Car('Honda', 'Accord', 2017)
sedan.activateTurnSignal('left') //! not safe!
new Car(2017, 'Honda', 'Accord') //! not safe!

const c = new Car('Honda', 'Accord', 2017)
c.honk(5)

console.log(new Car('Honda', 'Accord', 2017))
// > "Honda Accord 2017 - #100
console.log(new Car('Toyota', 'Camry', 2022))
// > "Toyota Camry 2022 - #101

//* Access modifier keywords
//? on member fields
// const s = new Sedan("Nissan", "Altima", 2020)
// s.serialNumber

//? on static fields
Car.generateSerialNumber() //* => Can't access because its private.

//* JS private #fields
//? member fields
c.#serialNumber //* => Can't access because its private.

//? static fields
// static #nextSerialNumber: number
// static #generateSerialNumber() { return this.#nextSerialNumber++ }
// #serialNumber = Car.#generateSerialNumber()

// Private (#) => Only the declaring class can access the member—not even subclasses can touch it.
// Protected => The declaring class and all its subclasses can access the member, but it's still hidden from code that is outside this class hierarchy.

//* Private field presence checks
const c2 = c
c2.equals(c)

//* readonly

//* Parameter properties
// constructor(
//     public make: string,
//     public model: string,
//     public year: number
//   ) {}

class Base {}

class Car2 extends Base {
  foo = console.log('class field initializer')
  constructor(public make: string) {
    super()
    console.log('custom constructor stuff')
  }
}

//* Overrides
class Truck extends Car {
  override honk() {
    // ^ marks here that a method with the same name should exist, so i cant for example create a hooonk method because dont exist in the base Car class
    return 'BEEP'
  }
}

const t = new Truck('Ford', 'F-150', 2020)
t.honk() // "beep"

//? override keyword
// override hoonk() { // OOPS!

//? noImplicitOverride
// "noImplicitOverride": true
// Make obrigatory the use of overide in same name methods

/**/
export default {}
