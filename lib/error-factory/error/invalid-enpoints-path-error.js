/**
 * @author Jafeth Garcia
 * @private
 */
const util = require('util');
const errorMessages = require('./../language');
const ERROR_CODE = 5002;

/**
 * Error used when service could not find the path for endpoints.
 * @class
 */
class InvalidEndpointsPathError extends Error {
  /**
   * Initializes an instance of the InvalidEndpointsPathError class.
   * @param {String} endpointsPath the endpoints path provided.
   * @constructor
   */
  constructor(endpointsPath) {
    super(util.format(errorMessages[ERROR_CODE], endpointsPath));
  }
}

module.exports = { invalidEndpointsPath: InvalidEndpointsPathError };
