/**
 * @author Jafeth Garcia
 */
const errorMessages = require('./../language');
const ERROR_CODE = 5001;

/**
 * Error used when service was not initiated.
 * @class
 */
class ServiceNotStartedError extends Error {
  /**
   * Initializes an instance of the ServiceNotStartedError class.
   * @constructor
   */
  constructor() {
    super(errorMessages[ERROR_CODE]);
  }
}

module.exports = { serviceNotStarted: ServiceNotStartedError };
