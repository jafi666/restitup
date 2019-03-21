/**
 * @author Jafeth Garcia
 */
let path = require('path');
let fs = require('fs');
let pathExists = require('path-exists');
/**
 * 
 * @param {String} modulesPath the path where modules are
 * @param  {...any} api any other argument params
 * @returns {void}
 * @private
 */
function _customRequire(modulesPath, ...api) {
  const moduleNames = fs.readdirSync(modulesPath);
  for (let moduleName of moduleNames) {
    const modulePath = path.join(modulesPath, moduleName);
    let loadedModule = require(modulePath);
    if (typeof(loadedModule) == 'function') {
      loadedModule(...api);
    }
  }
}
/**
 * Loads one Node module dinamically using a common API.
 * @param {String} filePath The path where the modules are saved.
 * @param {Boolean} isRequired - verify if exist the directory.
 * @param {Object} api An object that implements the API to interact with modules to be loaded.
 * @returns {void}
 * @private
 */
function _load(filePath, isRequired, ...api) {
  const appDir = path.dirname(require.main.filename);
  const modulesPath = path.join(appDir, filePath);
  if (isRequired) {
    if(pathExists.sync(modulesPath)) {
      _customRequire(modulesPath, ...api);
    }
  } else {
    _customRequire(modulesPath, ...api);
  }
}
module.exports = _load;
