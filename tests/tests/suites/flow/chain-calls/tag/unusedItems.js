// [require-a-lot] testRequires begin
  const {
    anotherTestData, // *di parameter* |
    assert, // *node module*: assert | https://nodejs.org/api/assert.html |
    assetDir, // *di service* | Test assets root directory |
    consoleCapture, // undefined
    cowlog, // cowlog@1.6.62 | https://github.com/dsl-toolkit/cowlog | Development time logging for NodeJs |
    diAssetDir, // *di service* | map-dir related test assets folder. |
    directoryFixtureProvider, // directory-fixture-provider@1.6.63 | https://github.com/dsl-toolkit/directory-fixture-p...
    executeIfNycIsOff, // *di service* | Executes function if nyc is not running, technically if the test-dev script is...
    fixturesPath, // *di parameter* |
    genericTextLinker, // generic-text-linker@1.6.62 | https://github.com/dsl-toolkit/generic-text-linker | Generic tex...
    isNyc, // *di parameter* | true if nyc is turned on |
    l, // *di service* | an instance of the cowlog |
    logger, // *di service* | an instance of the cowlog |
    mapDirAssetDir, // *di service* |
    path, // *node module*: path | https://nodejs.org/api/path.html |
    requireALot, // *alias* of ../../src | The main library itself. |
    requireDir, // require-dir@1.2.0 | https://github.com/aseemk/requireDir | Helper to require() directories. |
  }
// [require-a-lot] testRequires end
  = require('../../../../../lib/requires')

const fixtureProvider = require('./lib/fixtureProvider')

describe('.tag .linkDirectory .removeUnused Basic templating tests missing variables', () => {

  // it('tests remove unused', () => {
  //   const {fixture, ral, fixtureDir} = fixtureProvider()
  //   ral()
  //   assert(fixture.getStatus().changed)
  // })

  it('tests remove unused', () => {
    const {fixture, ral, fixtureDir} = fixtureProvider()
    ral.removeUnused()
    const status = fixture.getStatus()
    assert(status.changed)
    // l(status.contents, fixtureDir)()
  })

  // describe('', () => {
  //   it(')', () => {
  //   })
  // })

})
