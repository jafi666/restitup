/**
 * @author Jafeth Garcia
 */
const { EventEmitter } = require('events');
/**
 * Rest it up class container, this class will have as attributes all the endpoint objects.
 * @class
 */
class Restitup extends EventEmitter {
  /**
   * Initializes the restitup instance.
   * @param {Class} factory factory class meant to initiate all service processes.
   * @param {Object} options the service configuration passed to overwrite default options.
   * @example
   * {
   *   apiUrl: "http://localhost"
   *   rootPath: '/v1',
   * }
   * @constructor
   */
  constructor(factory, options) {
    super();
    this._options = options;
    this._lastRequest = undefined;
    this._lastResponse = undefined;
    this._modules = {};
    factory.init(this, this._options);
  }
  /**
   * Gets the service configuration options 
   * @returns {Object} the service configuration options.
   * @example
   * {
   *   apiUrl: "http://localhost"
   *   rootPath: '/v1',
   *   headers: {
   *    'Content-Type': 'application/json',
   *    'Host': 'api.schoology.com'
   *   },
   *   authorization: {
   *     strategy: 'oauth1',
   *     oauth1: {
   *        consumerKey: 'b06382cb37b1cf75ba78506f891f013405c621433',
   *        consumerSecret: 'c00d645943f0264d336e91c9cebcf621'
   *      }
   *   },
   *   endpointsPath: 'src/endpoint-objects',
   *   logger: {
   *     appenders: {
   *       file: {
   *         type: 'file',
   *         filename: 'api-test.log'
   *       }
   *     }
   *   }
   * }
   */
  get options() {
    return this._options;
  }  
  /**
   * Gets the framework modules in context
   * @returns {Object} the current modules.
   */
  get modules() {
    return this._modules;
  }
  /**
   * Gets and Sets a module.
   * @param {String} name the module name.
   * @param {Object} value the module value to inject.
   * @returns {Restitup|Object} when setting a module it will return Restitup instance, 
   * when getting will return the module value.
   */
  module(name, value) {
    if (value) {
      this._modules[name] = value;
      return this;
    }
    return this._modules[name];
  }
}

module.exports = { Restitup };
