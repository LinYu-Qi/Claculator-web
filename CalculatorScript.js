const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')


calculator.dataset.operator=''



keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
  
  const key = e.target
  const action = key.dataset.action
  const keyContent = key.textContent
  const displayedNum = display.textContent
  const previousKeyType=calculator.dataset.previousKeyType
  const firstVal=calculator.dataset.firstVal
  const operator=calculator.dataset.operator

 
  // NUMBER AREA
  if (!action) {
  
    if (displayedNum === '0' || previousKeyType === 'operator') {
      display.textContent = keyContent
      calculator.dataset.previousKeyType=''

    } else {
      display.textContent = displayedNum + keyContent


    }
    }
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    //Remove depressed button before new operator pressed 
    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))
    calculator.dataset.firstValue = displayedNum
    calculator.dataset.operator = action
    key.classList.add('is-depressed')
    calculator.dataset.previousKeyType = 'operator'
  }
  if (action === 'decimal' && displayedNum%1===0) {
    
    display.textContent = displayedNum + '.'
     calculator.dataset.previousKeyType = 'decimal'
 
  }
  
  if (action === 'clear') {
    console.log('clear key!')
    calculator.dataset.previousKeyType = ''
    display.textContent='0'
    calculator.dataset.firstValue='0'
   
  }
  
  if (action === 'calculate') {
    const secondValue = displayedNum
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    display.textContent = calculate(firstValue, operator, secondValue)
    
    
     // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }
  }

})

const calculate = (n1, operator, n2) => {
  let result = ''
  n1=parseFloat(n1,10)
  n2=parseFloat(n2,10)
  if (operator === 'add') {
    result = n1 + n2
  } else if (operator === 'subtract') {
    result = n1 - n2
  } else if (operator === 'multiply') {
    result = n1 * n2
  } else if (operator === 'divide') {
    result = n1 / n2
  } else if (operator === '') {
    console.log(n2)
    result = n2
  }

  return result
}

