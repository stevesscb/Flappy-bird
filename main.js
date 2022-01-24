
//sudo code
//generating the entry hole between the pipes
// min distance is 70px, max distance 100px
function generateEntryHole(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

generateEntryHole(70, 100)
