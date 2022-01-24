const GAME_HEIGHT = 600
const GAME_WIDTH = 600
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)
const VELOCITY = 2.5

// Game Loop
let gameLoop

// Elements
const $gameScreen = $('#game-screen')
const $topBlock = $('#.top-block')
const $botBlock = $('#.bot-block')

// Character
const character = {
  $elem: $('<div id="character"></div>'),
  position: { x: 100, y: 275 },
  movement: { up: false, down: false }
}

// Blocks
const blocks = [
  // {
  //   $elem: $('<div class="block top-block"></div>'),
  //   position: { x: 550, y: 0 },
  //   height: 178
  // }, {
  //   $elem: $('<div class="block bot-block"></div>'),
  //   position: { x: 550, y: 252 },
  //   height: 348
  // }
]

// Toggle which direction the character is moving to
const setChararacterMovement = (value, keyCode) => {
  switch (keyCode) {
    case 32:
    case 38:
      character.movement.up = value
      break
    case 40:
      character.movement.down = value
      break
  }
}

// Handling Key Down
const handleKeyDown = (e) => {
  setChararacterMovement(true, e.keyCode)
}

// Handling Key Up
const handleKeyUp = (e) => {
  setChararacterMovement(false, e.keyCode)
}

// Everytime this gets invoked, update character position
const updateCharacterMovements = () => {
  const { position: { x, y }, movement: { up, down } } = character
  let newY = y

  if (up) newY -= VELOCITY
  if (down) newY += VELOCITY

  character.position.y = newY
  character.$elem.css('left', x).css('top', newY)
}

const init = () => {
  // Add Character To Screen
  character.$elem.appendTo($gameScreen)

  // Add key event listeners
  $(document).on('keydown', handleKeyDown)
  $(document).on('keyup', handleKeyUp)



  // Start the game loop
  gameLoop = setInterval(() => {
    updateCharacterMovements()
    // updateBlockMovements()

    // check if character have collided with any blocks
    // generate block every x seconds

  }, LOOP_INTERVAL)
}

//generating pipes

//sudo code
//generating the entry hole between the pipes
// min distance is 70px, max distance 100px
const genEntryHeight = (min, max)  => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//generating the total length of pipe
const genPipesHeight = (entryHeight) => {
  debugger
  const allocationHeight = GAME_HEIGHT - entryHeight

  const topHeightPercentage = Math.random().toFixed(2)

  const topHeight = Math.floor(allocationHeight * topHeightPercentage)
  const botHeight = allocationHeight - topHeight

  return {
    topHeight,
    botHeight
  }
}

const genHeights = () => {
  const entryHeight = genEntryHeight(70, 100)
  const pipeHeight = genPipesHeight(entryHeight)

  return {
    ...pipeHeight,
    entryHeight
  }
}

const heights = genHeights()
console.log(heights)

init()
