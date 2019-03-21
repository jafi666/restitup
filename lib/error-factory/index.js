/**
 * @author Jafeth Garcia
 */
const { ErrorHandler } = require('./error-handler');

/**
 * Implements an error factory that is able to generate specific error types.
 * @class
 */
class ErrorFactory {
  /**
   * Throws an error.
   * @param {string} errorName - an error name.
   * @param {Array} params -a list of error params.
   * @returns {void}
   * @static
   */
  static throwError(errorName, ...params) {
    throw ErrorHandler.getError(errorName, ...params);
  }
  /**
   * Gets an instance of an error.
   * @param {string} errorName - an error name.
   * @param {Array} params - a list of error params.
   * @returns {Error} return an instance of error.
   * @static
   */
  static getError(errorName, ...params) {
    return ErrorHandler.getError(errorName, ...params);
  }
}

module.exports = { ErrorFactory };
