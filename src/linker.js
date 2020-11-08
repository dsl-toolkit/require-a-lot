const { linkerDir, linkerFile } = require('generic-text-linker')
const trimRight = require('trim-right')
const fs = require('fs')

const linking = (linkFile, begin, end, msg, emptySpaces) => {
  msg = msg.split('\n').map(line => trimRight(line)).join('\n')
  const params = [linkFile, begin, end, msg.split('\n')
  .map(line => emptySpaces + line).join('\n')]
  return typeof linkFile === 'string'
    ? fs.lstatSync(linkFile).isDirectory()
      ? linkerDir(...params)
      : linkerFile(...params)
    : {}
}
const prepareMsgAsParameters = (msg) => {
  msg = msg.replace("const {", '').replace("}", '')
  return msg
}

module.exports = (linkFile, begin, end, msg, emptySpaces) => {
  const returningObject = {}

  Object.assign(returningObject,
    linking(linkFile, begin, end, msg, emptySpaces),
    linking(linkFile, begin + ' parameters', end + ' parameters', prepareMsgAsParameters(msg), emptySpaces),
  )

  return returningObject
}
