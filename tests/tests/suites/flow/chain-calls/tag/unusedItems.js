// [require-a-lot] testRequires begin
const {
  assert // *node module*: assert | https://nodejs.org/api/assert.html |
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
