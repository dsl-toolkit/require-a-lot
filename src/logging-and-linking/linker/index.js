const linker = require('../../linker')
const { linkerDir } = require('generic-text-linker')
const { tokenize } = require('esprima')
const fs = require('fs')
let executedTimes = 0
const linkFile = require('./linkFile')

module.exports = (parameters, dependenciesJsCode, begin, end) => {
  const linkDirectory = parameters.arguments('linkDirectory', 'lastArgument')
  const removeUnused = parameters.command.has('removeUnused')
  const originalContent = linkerDir(linkDirectory, begin, end)
  const emptySpaces = originalContent ? (() => {
    const originalFirstLine = originalContent.split('\n')[0]
    const trimmedOne = originalFirstLine.trim()
    return new Array(originalFirstLine.length - trimmedOne.length + 1).join(' ')
  })() : ''
  const linkerResults = linker(linkDirectory, begin, end, dependenciesJsCode, emptySpaces)

  const linkerResultsKeys = linkerResults ? Object.keys(linkerResults) : []

  if (removeUnused) {
    executedTimes++
    const rottenFiles = []
    const perFileVariableAllUses = linkerResultsKeys.map(fileName => {
      const inspect = fileName.includes('mencoder')
      // if(!processedFiles.includes(fileName)){
      // }

      let modifiedContent, tokenizedDepedencies
      try {
        modifiedContent = tokenize(fs.readFileSync(fileName).toString())
        tokenizedDepedencies = tokenize(dependenciesJsCode)
      }
      catch (e) {
        rottenFiles.push(fileName);
      }
      if(tokenizedDepedencies){
        const relevantDependencies = tokenizedDepedencies.filter(entry => {
          if (entry.type === 'Identifier') {
            return entry
          }
        }).map(entry => entry.value)
        .map(declaredVariables => modifiedContent.filter(entry => declaredVariables === entry.value))

        return relevantDependencies
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
        let msgArray = dependenciesJsCode.split('\n')

        unusedVariables.forEach(variableName => {
          msgArray = msgArray.filter(line => !line.trim().startsWith(variableName))
        })
        linkFile(file, begin, end, msgArray, emptySpaces)
      }
    })
  }
}
