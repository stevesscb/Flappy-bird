const GAME_HEIGHT = 600

// generating the entry hole between the pipes
// min distance is 70px, max distance 100px
const genEntryHeight = (min, max)  => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//generating the total length of pipe
const genPipesHeight = (entryHeight) => {
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
  const entryHeight = genEntryHeight(100, 160)
  const pipeHeight = genPipesHeight(entryHeight)

  return pipeHeight
}

export default genHeights
