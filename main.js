
//sudo code
//generating the entry hole between the pipes
// min distance is 70px, max distance 100px

const generateEntryHole = (min, max)  => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const entryHole = generateEntryHole(70, 100)


//generating the pipes
//dividing the generateEntryHole value by 2 and storing them into 2 variables
const generatePipes = () => {
screenHeight = 600
pipeLength = screenHeight - entryHole
}


// const generateRandomInt = (max) => {
//   return Math.floor(Math.random() * max)
// }

// const generateEquation = () => {
//   num1 = generateRandomInt(10)
//   num2 = generateRandomInt(10)
//   answer = num1 + num2

//   $num1.text(num1)
//   $num2.text(num2)
// }
