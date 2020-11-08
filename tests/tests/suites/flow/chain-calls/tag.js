// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  directoryFixtureProvider, // directory-fixture-provider@1.6.63 | https://github.com/dsl-toolkit/directory-fixture-p...
  fixturesPath, // *di parameter* |
  l, // *di service* | an instance of the cowlog |
  requireALot // *alias* of ../../src | The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

const fixtureProvider = () => {
  const provider = directoryFixtureProvider(fixturesPath)()
  const fixture = provider.get('./')

  return fixture
}

describe('.tag .linkDirectory test', () => {

  it('should not change anything', () => {
    const provider = fixtureProvider()
    const {dir:fixtureDir} = provider
    requireALot(require)('fs')
    .linkDirectory(fixtureDir)
    .tag('b')
    ()
    assert(!provider.getStatus().changed)
  })

  it('should change the files with tag "a"', () => {
    const provider = fixtureProvider()
    const {dir:fixtureDir} = provider
    requireALot(require)('fs')
    .linkDirectory(fixtureDir)
    .tag('a')
    ()
    assert(provider.getStatus().changed)
  })

  it('tests the output correctness for a simple built in node nodule', () => {
    const provider = fixtureProvider()
    const {dir:fixtureDir} = provider
    requireALot(require)('fs')
    .linkDirectory(fixtureDir)
    .tag('a')
    ()
    const status = provider.getStatus()
    const testFileContent = status.contents['test-01.js']
    l(status.contents['test-01.js'])()
    assert(testFileContent.includes('fs, // *node module*'))
    assert(testFileContent.includes('https://nodejs.org/api/fs.html'))
    assert(testFileContent.includes('// [require-a-lot] a begin\nconst {'))
    assert(testFileContent.includes('|\n}\n// [require-a-lot] a end'))
    assert(testFileContent.includes('{\n  fs,'))

    assert(provider.getStatus().changed)
  })

})
