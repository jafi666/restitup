/**
 * @author Jafeth Garcia
 */
const through2 = require('through2');
// libs
const { Restitup } = require('./lib/restitup');
const { ErrorFactory } = require('./lib/error-factory');
const { Factory } = require('./lib/factory');
const { HttpStatus } = require('./lib/utils');

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
      instance = new Restitup(options);
      Factory.init(instance, options);
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
    return ErrorFactory;
  }
  /**
   * Gets an object with all htto status code constants.
   * @returns {Object} the http staute constants object.
   * @static
   */
  static get HttpStatus() {
    return HttpStatus;
  }
}

module.exports = Service;
