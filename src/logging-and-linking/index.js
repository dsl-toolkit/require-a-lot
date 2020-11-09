const textGenerator = require('./message-creator/textGenerator')
module.exports = (ralContainer) => {
  const { parameters, messagePieces, begin, end} = ralContainer
  require('./message-creator/mesaggeCommentFiller')(ralContainer)
  const {tagOpen, tagEnd, tagEqual} = messagePieces
  let msg = textGenerator(ralContainer)

  const consoleMessage = require('./prepare-before-placement')(tagOpen + msg + tagEnd + tagEqual)
  parameters.command.has('log') && console.log(consoleMessage)

  require('./linker')(ralContainer)(parameters, begin, end)
}
