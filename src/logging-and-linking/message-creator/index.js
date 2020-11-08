const arrayDsl = require('array-dsl')
const messagePieces = require('./messagePieces')
const extractData = require('./extractData')

module.exports = (parameters, results, infoList) => {
  parameters.arguments('information', 'allEntries', [[]]).forEach(e => {
    const description = { description: e[1] }
    const conainerEntries = arrayDsl(e[0]).arrify()
    conainerEntries.forEach(entry => {
      infoList[entry] = infoList[entry] ? Object.assign(infoList[entry], description) : description
    })
  })
  const {
    maxLineWidth, begin, end, tagOpen, tagEnd, tagEqual, noTagEqual, listDelimiter, lastLineDelimiter,
    // tag, info, log
  } = messagePieces(parameters)
  let msg = extractData(listDelimiter, results, infoList, lastLineDelimiter, noTagEqual, maxLineWidth)

  const consoleMessage = tagOpen + msg + tagEnd + tagEqual

  return { msg, consoleMessage, begin, end }
}
