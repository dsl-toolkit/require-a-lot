const { linkerDir } = require('generic-text-linker')
const { tokenize } = require('esprima')
const fs = require('fs')
const linker = require('../../linker')
const util = require('util')


module.exports = (parameters, msg, begin, end) => {
  const linkDirectory = parameters.arguments('linkDirectory', 'lastArgument')
  const removeUnused = parameters.command.has('removeUnused')
  const originalContent = linkerDir(linkDirectory, begin, end)
  const emptySpaces = originalContent ? (() => {
    const originalFirstLine = originalContent.split('\n')[0]
    const trimmedOne = originalFirstLine.trim()
    return new Array(originalFirstLine.length - trimmedOne.length + 1).join(' ')
  })() : ''
  const linkerResults = linker(linkDirectory, begin, end, msg, emptySpaces)
  const linkerResultsKeys = linkerResults ? Object.keys(linkerResults) : []
  if (removeUnused) {
    const rottenFiles = []
    const perFileVariableAllUses = linkerResultsKeys.map(file => {
      let modifiedContent, tokenizedMsg
      try {
        modifiedContent = tokenize(fs.readFileSync(file).toString())
        tokenizedMsg = tokenize(msg)
      }
      catch (e) {
        rottenFiles.push(file);
      }
      if(tokenizedMsg){
        return tokenizedMsg.filter(entry => {
          if (entry.type === 'Identifier') {
            return entry
          }
        }).map(entry => entry.value)
        .map(declaredVariables => modifiedContent.filter(entry => declaredVariables === entry.value))

      }
    })

    const perFileVariables = linkerResultsKeys.map((file, fileIndex) => {
      let variables
      if (!rottenFiles.includes(file)){
        const fileResults = perFileVariableAllUses[fileIndex]
        variables = fileResults.map(fileResult => {
          const name = fileResult[0].value
          const used = fileResult.length - 1
          return {name, used}
        }).filter(entity => !entity.used).map(entity => entity.name)

      }

      return variables
    })

    linkerResultsKeys.map((file, fileIndex) => {
      if(!rottenFiles.includes(file)){
        const unusedVariables = perFileVariables[fileIndex]
        let msgArray = msg.split('\n')

        unusedVariables.forEach(variableName => {
          msgArray = msgArray.filter(line => !line.trim().startsWith(variableName))
        })

        linker(file, begin, end, require('../prepare-before-placement')(msgArray.join('\n')), emptySpaces)
      }
    })
  }
}
