/**
 * @author Jafeth Garcia
 */
const through2 = require('through2');
// libs
const { Restitup } = require('./lib/restitup');
const { ErrorFactory } = require('./lib/error-factory');
const { Factory } = require('./lib/factory');
const { HttpStatus } = require('./lib/modules/http-status-code');
const { Logger } = require('./lib/modules/logger');

let options = require('./lib/options') ;
let instance = undefined;
/**
 * Main service class
 * @class
 */
class Service {
  /**
   * Initializes the restitup instance as gulp pipe.
   * @param {Object} configuration the service configuration.
   * @returns {void} 
   */
  static Gulp(configuration) {
    return through2.obj((file, _, cb) => {
      configuration.appDir = file.path;
      Service.Start(configuration);
      cb(null, file);
    });
  }
  /**
   * Initializes the restitup instance if not initiated.
   * @param {Object} configuration the service configuration.
   * @returns {void}
   */
  static Start(configuration) {
    if (!instance) {
      options = { ...options, ...configuration };
      instance = new Restitup(Factory, options);
    }
  }
  /**
   * Gets the service single instance.
   * @returns {Object} the service restitup single instance.
   * @static
   */
  static get Restitup() {
    if (!instance) {
      ErrorFactory.throwError('serviceNotStarted');
    } 
    return instance;
  }
  /**
   * Gets the Error Factory class.
   * @returns {Class} the error factory class.
   * @static
   */
  static get ErrorFactory() {
    if (!instance) {
      ErrorFactory.throwError('serviceNotStarted');
    }
    return ErrorFactory;
  }
  /**
   * Gets an object with all htto status code constants.
   * @returns {Object} the http state constants object.
   * @static
   */
  static get HttpStatus() {
    if (!instance) {
      ErrorFactory.throwError('serviceNotStarted');
    }
    return HttpStatus;
  }
  /**
   * Gets an object with all htto status code constants.
   * @returns {Object} the http state constants object.
   * @static
   */
  static get Logger() {
    if (!instance) {
      ErrorFactory.throwError('serviceNotStarted');
    }
    return Logger.getInstance();
  }
  /**
   * Kills service global instances, requires service to be started again in order to work again.
   * @returns {void}
   * @private
   * @protected
   */
  static _kill() {
    if (instance) {
      Factory._kill();
      instance = undefined;
    }
  }
}

module.exports = Service;
