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
}

module.exports = { Restitup };
