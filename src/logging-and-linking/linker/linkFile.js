const linker = require('../../linker')
module.exports = (ralContainer) => (file, msg, emptySpaces, extraTag) => {
    linker(ralContainer)(file, require('../prepare-before-placement')(msg), emptySpaces, extraTag)
}
