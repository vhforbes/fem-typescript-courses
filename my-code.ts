type NestedNumbers = number | NestedNumbers[]

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]

const reduceSumArrayValues = (values: NestedNumbers): number => {
  if (typeof values === 'number') {
    return values // Base case: return the number
  }

  let intialValue = 0

  return values.reduce((acc: number, currentValue: NestedNumbers) => {
    return acc + reduceSumArrayValues(currentValue)
  }, intialValue)
}

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

console.log(reduceSumArrayValues(val))
