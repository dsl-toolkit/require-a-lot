const compare = require('compare')

module.exports = (listDelimiter, results, infoList, lastLineDelimiter, noTagEqual, maxLineWidth) => {
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
  return msg
}
