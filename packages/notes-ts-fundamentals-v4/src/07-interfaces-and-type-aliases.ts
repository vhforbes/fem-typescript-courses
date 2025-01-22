//* Type Aliases
type Amount = {
  currency: string
  value: number
}

function printAmount(amt: Amount) {
  console.log(amt)

  const { currency, value } = amt
  console.log(`${currency} ${value}`)
}

const donation = {
  currency: 'USD',
  value: 30.0,
  description: 'Donation to food bank',
}

printAmount(donation) //✔️ Valid

//? Let's look at a familiar example from the last chapter

function flipCoin() {
  if (Math.random() > 0.5) return 'heads'
  return 'tails'
}
const success = [
  'success',
  { name: 'Mike North', email: 'mike@example.com' },
] as const
const fail = ['error', new Error('Something went wrong!')] as const

export function maybeGetUserInfo():
  | readonly ['error', Error]
  | readonly ['success', { name: string; email: string }] {
  // implementation is the same in both examples
  if (flipCoin() === 'heads') {
    return success
  } else {
    return fail
  }
}

//? Let's model the return type as an interface

type UserInfoOutcomeError = readonly ['error', Error]
type UserInfoOutcomeSuccess = readonly [
  'success',
  { readonly name: string; readonly email: string },
]
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess

//* Inheritance in type aliases

type SpecialDate = Date & { getDescription(): string }

const newYearsEve: SpecialDate =
  //                    ^?
  Object.assign(new Date(), {
    getDescription: () => 'Last day of the year',
  })

newYearsEve.getDescription
// //             ^?

//* Interfaces

interface Amount2 {
  currency: string
  value: number
}

function printAmount2(amt: Amount2) {
  amt
}

//* Inheritance in interfaces

//? `extends` keyword
function consumeFood(arg) {}

// Here we hava how it works on the JS side
class AnimalThatEats {
  eat(food) {
    consumeFood(food)
  }
}

class Cat extends AnimalThatEats {
  meow() {
    return 'meow'
  }
}

const c = new Cat()
c.eat
c.meow()

interface Animal {
  isAlive(): boolean
}
interface Mammal extends Animal {
  getFurOrHairColor(): string
}
interface Hamster extends Mammal {
  squeak(): string
}
function careForHamster(h: Hamster) {
  h.getFurOrHairColor()
  h.squeak()
  //   ^|
}

//? `implements` keyword

interface AnimalLike {
  eat(food): void
}

// Here dog don't adhere the Animal like interface that it's trying to implement
class Dog implements AnimalLike {
  bark() {
    return 'woof'
  }
}

class LivingOrganism {
  //? A base class
  isAlive() {
    return true
  }
}

interface CanBark {
  //? Another interface
  bark(): string
}

class Dog2 extends LivingOrganism implements AnimalLike, CanBark {
  bark() {
    return 'woof'
  }
  eat(food) {
    consumeFood(food)
  }
}

//? Implements sometimes works with type aliases

type CanJump = {
  jumpToHeight(): number
  // | [number, number]
}

class Dog3 implements CanJump, CanBark2 {
  jumpToHeight() {
    return 1.7
  }
  eat(food) {
    consumeFood(food)
  }
}

type CanBark2 =
  | number
  | {
      bark(): string
    }

//* Open interfaces

// Considering this interf. \/ is comming from a lib and you cant edit it.
// * Code before *
// function feed(animal: AnimalLike) {
//   animal.eat
//   animal.isAlive
// }
// * Code After *
function feed(animal: AnimalLike) {
  if (animal.isAlive()) {
    animal.eat('food')
  }
}

// This modifies it everywhere that uses the AnimalLike interface
interface AnimalLike {
  //✔️ Additional declaration is OK
  isAlive(): boolean
}

//* Use case: augmenting existing types

window.document // an existing property
//      ^? (property) document: Document
window.exampleProperty = 42 // => will error without the global after
//      ^? (property) exampleProperty: number

// tells TS that `exampleProperty` exists
declare global {
  interface Window {
    exampleProperty: number
  }
}

//* Recursive types

type NestedNumbers = number | NestedNumbers[]

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]

const sumArrayValues = (values: NestedNumbers): number => {
  if (typeof values === 'number') {
    return values // Base case: return the number
  }

  let intialValue = 0

  for (let index = 0; index < values.length; index++) {
    const element = values[index]

    intialValue += sumArrayValues(element)
  }

  return intialValue
}

/*
// if (typeof val !== "number") {
//   val.push(41)
//   val.push("this will not work") //! No strings allowed
// }

/**/
export default {}
