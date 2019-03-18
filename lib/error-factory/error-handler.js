/**
 * @author Jafeth Garcia
 */
const fs = require('fs');
const path = require('path');

let errorsLoaded = false;
let errors = {}

function _loadErrors() {
  if (errorsLoaded) return;
  errorsLoaded = true;
  const listenersPath = path.join(__dirname) + '/error';
  const listenerFileNames = fs.readdirSync(listenersPath);
  for (let listenerFile of listenerFileNames) {
    errors = {...errors, ...require(`./${listenerFile}`)};
  }
};


class ErrorHandler {

  /**
   * Returns an instance of Error
   * @param {string} errorName - Name of the error.
   * @example
   *  let errorName = 'emptyArgumentError';
   * @param {Array} params - List of params to create error.
   * @return {Error} An instance of Error;
   */
  static getError(errorName, ...params) {
    _loadErrors();
    if (errors[errorName])
      return new errors[errorName](...params);
    else
      return new errors['native'](errorName);
  }
}

module.exports = { ErrorHandler };
