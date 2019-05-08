const camelCase = require('camelcase')

module.exports = (loclalPath,returnObject,lokalPackageName,requireModuleInstance,libraryToRequire,name) => {
  loclalPath && (()=>{returnObject[camelCase(lokalPackageName)] = requireModuleInstance(libraryToRequire)})()
  loclalPath || (()=>{returnObject[camelCase(name)] = requireModuleInstance(libraryToRequire)})()
}
