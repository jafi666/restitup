/**
 * @author Jafeth Garcia
 */
/**
 * Rest it up class container, this class will have as attributes all the endpoint objects.
 * @class
 */
class Restitup  {
  /**
   * Initializes the restitup instance.
   * @param {Object} options the service configuration.
   */
  constructor(options) {
    this._options = options;
  }
  /**
   * @returns {Object} the service configuration options.
   */
  get options() {
    return this._options;
  }  
}

module.exports = { Restitup };