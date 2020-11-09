const linker = require('../../linker')
module.exports = (file, begin, end, msgArray, emptySpaces) => {
    linker(file, begin, end, require('../prepare-before-placement')(msgArray.join('\n')), emptySpaces)
}
