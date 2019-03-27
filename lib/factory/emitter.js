/**
 * @author Jafeth Garcia
 */
const { EventEmitter } = require('events');
/**
 * Mixer class meant to wrap EventEmitter.
 * @param {function} superClass the parent class. 
 * @returns {class} the mixer class
 * @private
 */
module.exports = (superClass) => {
  /**
   * Class emitter meant to wrap EventEmitter, this class can be mixed with RestManager
   * @class Emitter
   */
  return class extends superClass {
    /**
     * Initiliazes the emitter object.
     * @constructor
     * @memberof Emitter
     */
    constructor() {
      super();
      this.eventEmitter = new EventEmitter();
    }
    /**
     * Retrieves information through an event.
     * @param {String} event the event.
     * @param {Function} callback the callback function that will be called when an event arrives.
     * @returns {void}
     * @memberof Emitter
     */
    on(event, callback) {
      this.eventEmitter.on(event, callback);
    }
    /**
     * Emits information over an event.
     * @param {String} event the event.
     * @param  {...any} params the argument params sent to the event.
     * @returns {void}
     * @memberof Emitter
     */
    emit(event, ...params) {
      this.eventEmitter.emit(event, ...params);
    } 
  };
};
