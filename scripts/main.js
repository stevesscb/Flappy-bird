import genHeight from './gen-height.js'

// GLOBAL | CONSTANTS
const GAME_HEIGHT = 600
const GAME_WIDTH = 600
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const BLOCK_WIDTH = 50
const FPS = 60
const LOOP_INTERVAL = Math.round(1000 / FPS)
const CHARACTER_VELOCITY = 4
const GRAVITY_VELOCITY = 1.8
const BLOCK_VELOCITY = 2.5

// GLOBAL | Game Variables
let blockLoop
let gameLoop
let score
const $gameScreen = $('#game-screen')
const $startBtn = $('.start-btn')
const $resetBtn = $('.reset-btn')
const $startScreen = $('#start-screen')
const $gameOverScreen = $('#game-over-screen')
const $score = $('#score')
//About screen
const $aboutScreen = $('#about-screen')
const $closeBtn = $('.close-btn')
const $aboutBtn = $('#about-btn')
const $footer = $('footer')

// Character | Object
const character = {
  $elem: $('<div id="character"></div>'),
  position: { x: 100, y: 275 },
  movement: { up: false, down: false },
  height: CHARACTER_HEIGHT,
  width: CHARACTER_WIDTH
}

// Character | Toggle which direction the character is moving to
const setCharacterMovement = (value, keyCode) => {
  switch (keyCode) {
    case 32:
    case 38:
    case 71:
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


// Character collides with top and bottom of screen
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

// Character collides with pipe
  character.position.y = newY
  character.$elem.css('left', x).css('top', newY)
}

// Blocks | Array
let blocks

// Blocks | Block Generation
const generateNewBlocks = () => {
  // * generate blocks heights
  const newBlockHeights = genHeight()

  // * generate block object
  const topBlock = {
    $elem: $('<div class="block"></div>'),
    position: { x: 550, y: 0 },
    height: newBlockHeights.topHeight,
    width: BLOCK_WIDTH
  }

  const botBlock = {
    $elem: $('<div class="block"></div>'),
    position: { x: 550, y: GAME_HEIGHT - newBlockHeights.botHeight },
    height: newBlockHeights.botHeight,
    width: BLOCK_WIDTH
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
      score += 1
    }
  }
}


// Game | Start Game
const startGame = () => {

  // Removes start screen when play is clicked
  $startScreen.css("display", "none");
  $gameOverScreen.css("display", "none")
  $score.css("visibility", "hidden")

  // Re-Initialize Variables
  character.$elem.appendTo($gameScreen) // Add Character To Screen
  character.position = { x: 100, y: 275 } // Reset Character Position
  blocks = [] // Reset Blocks
  score = 0 // Reset Score

  // Start the game loop
  gameLoop = setInterval(() => {
    updateCharacterMovements()
    updateBlocksMovements()

  const {position: {x: cX, y: cY}, height: cH, width: cW  } = character

  for (const block of blocks) {
    const { position: {x: bX, y: bY}, height: bH, width: bW } = block
    if (cX < bX + bW &&
        cX + cW > bX &&
        cY < bY + bH &&
        cH + cY > bY) {
          stopGame()
        }
  }

  }, LOOP_INTERVAL)

  // Start the generation loop
  generateNewBlocks()
  blockLoop = setInterval(() => {
    generateNewBlocks()
  }, 4000)
}

// About | open
const aboutScreen = () => {
  $aboutScreen.css("display", "flex");
  $startScreen.css("display", "none");
}

// About | close
const closeAbout = () => {
  $aboutScreen.css("display", "none");
  $startScreen.css("display", "flex");
}

// Game | Stop Game
const stopGame = () => {
  // update score$score.css
  $score.text(`score: ${score / 2}`) // Add score to h3
  $score.css("visibility", "visible")
  // Show game over screen when game ended
  $gameOverScreen.css("display", "flex");

  // Remove Character From Screen
  character.$elem.remove()

  // Stop the game loop
  clearInterval(blockLoop)

  // Stop the generation loop
  clearInterval(gameLoop)
  $('.block').remove()
}

// Game | Initialization
const init = (e) => {
  // Add key event listeners
  $(document).on('keydown', handleKeyDown)
  $(document).on('keyup', handleKeyUp)

  $startScreen.on('click', $startBtn, startGame)

  $gameOverScreen.on('click', $resetBtn, startGame)

  $footer.on('click', $aboutBtn, aboutScreen)
  $aboutScreen.on('click', $closeBtn, closeAbout)
}

init()
