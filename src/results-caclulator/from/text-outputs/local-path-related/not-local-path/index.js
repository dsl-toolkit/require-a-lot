const {getInstalledPathSync} = require('get-installed-path')
const path = require('path')
const camelCase = require('camelcase')
const collectPackageInfo = require('./collectPackageInfo')

module.exports = (ralContainer, localPath, name, infoListIndex, libraryToRequire) => {
  const { parameters, infoList } = ralContainer
  const info = parameters.command.has('info')

  localPath || (() => {
    let filePath = ''
    let probablyNodeModule = false
    try {
      filePath = path.join(path.join(getInstalledPathSync(name, {local: true}), 'package.json'))
    } catch (e) {
      probablyNodeModule = true
    }
    probablyNodeModule && (() => {
      const camelCaseName = camelCase(name)
      // noPackageInfo.push(name)
      infoList[camelCaseName] = {
        head: `*node module*: ${libraryToRequire}`,
        homepage: `https://nodejs.org/api/${name}.html`
      }
    })()
    const infoData = collectPackageInfo(probablyNodeModule, filePath, info, infoList, infoListIndex)

    require('./from')(ralContainer, name, infoData)
    require('./alias')(ralContainer, name, infoData)
  })()
}

