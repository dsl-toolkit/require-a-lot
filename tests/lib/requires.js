const requireALot = require('../../src')
const path = require('path')
module.exports = requireALot(require)('../lib/capture','assert', 'cowlog', '../tests/test-spec')
// .from('chai',['expect'])
// .alias('src', 'requireALot')
  .linkDirectory(path.join(__dirname, '../', 'tests')).log.info.tag("testIncludes")
  .removeUnused
  ()
