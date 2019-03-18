/**
 * @author Jafeth Garcia
 */
const util = require('util');
const errorMessages = require('./../language');
const ERROR_CODE = 5000;

/**
 * Error used when no error was found.
 * @class
 */
class NativeError extends Error {
  /**
   * Initializes an instance of the Native class.
   * @constructor
   */
  constructor(errorName) {
    super(util.format(errorMessages[ERROR_CODE], errorName));
  }
}

module.exports = { native: NativeError };
