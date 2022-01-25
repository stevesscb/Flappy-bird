import genHeight from './gen-height.js'

// GLOBAL | CONSTANTS
const GAME_HEIGHT = 600
const GAME_WIDTH = 600
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)
const CHARACTER_VELOCITY = 4.5
const GRAVITY_VELOCITY = 1.5
const BLOCK_VELOCITY = 1.5

// GLOBAL | Game Variables
let blockLoop
let gameLoop
const $gameScreen = $('#game-screen')

// Character | Object
const character = {
  $elem: $('<div id="character"></div>'),
  position: { x: 100, y: 275 },
  movement: { up: false, down: false }
}

// Character | Toggle which direction the character is moving to
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

// Character | Handling Key Down
const handleKeyDown = (e) => {
  setCharacterMovement(true, e.keyCode)
}

// Character | Handling Key Up
const handleKeyUp = (e) => {
  setCharacterMovement(false, e.keyCode)
}

// Character | Every time this gets invoked, update character position
const updateCharacterMovements = () => {
  const { position: { x, y }, movement: { up } } = character
  let newY = y

  if (up) {
    if (y - CHARACTER_VELOCITY <= 0) {
      newY = 0
      stopGame()
    } else {
      newY -= CHARACTER_VELOCITY
    }
  } else {
    if (y + GRAVITY_VELOCITY >= 550) {
      newY = 550
      stopGame()
    } else {
      newY += GRAVITY_VELOCITY
    }
  }

  character.position.y = newY
  character.$elem.css('left', x).css('top', newY)
}

// Blocks | Array
const blocks = []

// Blocks | Block Generation
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

// Blocks | Movement
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

// Game | Start Game
const startGame = () => {
  // Add Character To Screen
  character.$elem.appendTo($gameScreen)

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

// Game | Stop Game
const stopGame = () => {
  clearInterval(blockLoop)
  clearInterval(gameLoop)
}

// Game | Initialization
const init = () => {
  // Add key event listeners
  $(document).on('keydown', handleKeyDown)
  $(document).on('keyup', handleKeyUp)

  // startGame()
}

init()
