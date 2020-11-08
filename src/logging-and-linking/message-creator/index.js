const arrayDsl = require('array-dsl')
const compare = require('compare')
const messagePieces = require('./messagePieces')

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

  let msg = `const {${listDelimiter}`
  const resultsKeys = Object.keys(results).sort(compare)

  resultsKeys.forEach((key, index) => {
    const infoObject = infoList[`${key}`]
    let msgPiece = `  ${key}${','} // `
    typeof infoObject === 'object' && (() => {
      msgPiece += `${infoObject['head'] || ''} `
      if (infoObject['head']) msgPiece += '| '
      msgPiece += infoObject['homepage']
        ? `${infoObject['homepage']} `
        : ''
      if (infoObject['homepage']) msgPiece += '| '
      msgPiece += infoObject['description']
        ? `${infoObject['description'] || ''} `
        : ''
      if (infoObject['description']) msgPiece += '| '
      msgPiece += infoObject['infoData']
        ? `${infoObject['infoData'] || ''} `
        : ''
    })()
    typeof infoObject === 'object' || (() => {
      msgPiece += `${infoObject}`
    })()

    msgPiece += `${listDelimiter}`
    msg += msgPiece
  })
  msg += `${lastLineDelimiter}} ${noTagEqual} `
  msg = msg.split('\n').map(line =>
    line.length > maxLineWidth
      ? (() => {
        const tooLong = '...'
        return line.slice(0, maxLineWidth - tooLong.length) + tooLong
      })()
      : line
  ).join('\n')
  const consoleMessage = tagOpen + msg + tagEnd + tagEqual

  return { msg, consoleMessage, begin, end }
}
