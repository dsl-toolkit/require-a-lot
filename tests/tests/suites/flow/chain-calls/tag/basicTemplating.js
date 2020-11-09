// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  directoryFixtureProvider, // directory-fixture-provider@1.6.63 | https://github.com/dsl-toolkit/directory-fixture-p...
  fixturesPath, // *di parameter* |
  requireALot // *alias* of ../../src | The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../../../lib/requires')
// const fixtureProvider = require('./lib/fixtureProvider')
const fixtureProvider = () => {
  const provider = directoryFixtureProvider(fixturesPath)()
  const fixture = provider.get('./')

  return fixture
}

describe('.tag .linkDirectory Basic templating tests', () => {

  it('should not change anything', () => {
    const fixture = fixtureProvider()
    const {dir:fixtureDir} = fixture
    requireALot(require)('fs')
    .linkDirectory(`${fixtureDir}/templating`)
    .tag('b')
    ()
    assert(!fixture.getStatus().changed)
  })

  it('should change the files with tag "a"', () => {
    const fixture = fixtureProvider()
    const {dir:fixtureDir} = fixture
    requireALot(require)('fs')
    .linkDirectory(`${fixtureDir}/templating`)
    .tag('a')
    ()
    assert(fixture.getStatus().changed)
  })

  describe('tests the templating output correctness for a simple built in node nodule', () => {
    const fixture = fixtureProvider()
    const {dir:fixtureDir} = fixture
    requireALot(require)('fs')
    .linkDirectory(`${fixtureDir}templating`)
    .tag('a')
    ()
    const status = fixture.getStatus()

    it('for the includes (top of the file usually)', () => {
      const testFileContent = status.contents['templating/test-01.js']
      assert(testFileContent.includes('fs, // *node module*'))
      assert(testFileContent.includes('https://nodejs.org/api/fs.html'))
      assert(testFileContent.includes('// [require-a-lot] a begin\nconst {'))
      assert(testFileContent.includes('|\n}\n// [require-a-lot] a end'))
      assert(testFileContent.includes('{\n  fs,'))
    })

    it('tests for parameter type includes', () => {
      const testFileContent = status.contents['templating/test-02.js']
      assert(testFileContent.includes('fs, // *node module*'))
      assert(testFileContent.includes('https://nodejs.org/api/fs.html'))
      assert(!testFileContent.includes('const {'))
      assert(!testFileContent.includes('}'))
      // todo: implement tests/feature not to have new line character at the beginnin and the end
    })

    it('for both ins the same template', () => {
      const testFileContent = status.contents['templating/test-03.js']
      assert(testFileContent.includes('fs, // *node module*'))
      assert(testFileContent.includes('https://nodejs.org/api/fs.html'))
      assert(testFileContent.includes('const {'))
      assert(testFileContent.includes('}'))
      assert(testFileContent.split('fs,').length === 3)
    })

  })

  describe('tests .removeUnused ', () => {
    const fixture = fixtureProvider()
    const {dir:fixtureDir} = fixture
    requireALot(require)('fs')
    .linkDirectory(`${fixtureDir}templating`)
    .tag('a')
    .removeUnused
    ()
    const status = fixture.getStatus()

    it('tests for the includes', ()=>{
      const testFileContent = status.contents['templating/test-01.js']
      assert(!testFileContent.includes('fs'))
      assert(testFileContent.includes('{'))
      assert(testFileContent.includes('}'))
    })

    it('tests for the parameters', ()=>{
      const testFileContent = status.contents['templating/test-02.js']
      assert(!testFileContent.includes('fs'))
      assert(!testFileContent.includes('{'))
      // l(testFileContent).die()

      // assert(!testFileContent.includes('}'))

    })

    it('tests for the both', ()=>{
      const testFileContent = status.contents['templating/test-03.js'] || ''
      // l(testFileContent, `${fixtureDir}templating`).die()
      assert(!testFileContent.includes('fs'))
      assert(testFileContent.includes('{'))
      assert(testFileContent.includes('}'))
    })

  })
})
