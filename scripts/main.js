import genHeight from './gen-height.js'

//
// GLOBAL CONSTANTS
//
const GAME_HEIGHT = 600
const GAME_WIDTH = 600
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)
const CHARACTER_VELOCITY = 2.5
const GRAVITY_VELOCITY = 1.5
const BLOCK_VELOCITY = 1.5

//
// GLOBAL Game Variables
//
let blockLoop
let gameLoop
const $gameScreen = $('#game-screen')

//
// Character
//
const character = {
  $elem: $('<div id="character"></div>'),
  position: { x: 100, y: 275 },
  movement: { up: false, down: false }
}

// Toggle which direction the character is moving to
const setCharacterMovement = (value, keyCode) => {
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
  setCharacterMovement(true, e.keyCode)
}

// Handling Key Up
const handleKeyUp = (e) => {
  setCharacterMovement(false, e.keyCode)
}

// Every time this gets invoked, update character position
const updateCharacterMovements = () => {
  const { position: { x, y }, movement: { up, down } } = character
  let newY = y

// character moving up and falling down
  if (up) {
    newY -= CHARACTER_VELOCITY + 2;
  } else {
    newY += GRAVITY_VELOCITY
  }

  character.position.y = newY
  character.$elem.css('left', x).css('top', newY)
}

//
// Blocks
//
const blocks = []

const generateNewBlocks = () => {
  // * generate blocks heights
  const newBlockHeights = genHeight()

  // * generate block object
  const topBlock = {
    $elem: $('<div class="block"></div>'),
    position: { x: 550, y: 0 },
    height: newBlockHeights.topHeight
  }

  const botBlock = {
    $elem: $('<div class="block"></div>'),
    position: { x: 550, y: GAME_HEIGHT - newBlockHeights.botHeight },
    height: newBlockHeights.botHeight,
    toBeDeleted: true
  }

  // * Append block to $gameScreen
  topBlock.$elem.appendTo($gameScreen)
  botBlock.$elem.appendTo($gameScreen)

  // * Add block object to blocks array
  blocks.push(topBlock, botBlock)
}

const updateBlocksMovements = () => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i]
    const { position: { x, y }, height } = block
    let newX = x - BLOCK_VELOCITY

    block.position.x = newX
    block.$elem.css('left', newX).css('top', y).css('height', `${height}px`)

    if (newX <= -50) {
      block.$elem.remove()
      blocks.splice(i, 1)
    }
  }
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
    updateBlocksMovements()
    // TODO check if character have collided at the top or bottom screen
    // TODO check if character have collided with any blocks
  }, LOOP_INTERVAL)

  // Start the generation loop
  generateNewBlocks()
  blockLoop = setInterval(() => {
    generateNewBlocks()
  }, 6000)
}

init()
