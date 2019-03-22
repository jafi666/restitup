/**
 * @author Jafeth Garcia
 */
const { EventEmitter } = require('events');
/**
 * Mixer class meant to wrap EventEmitter.
 * @param {class} superClass the parent class. 
 * @class
 */
module.exports = (superClass) => class extends superClass {
  /**
   * Initiliazes the emitter object.
   * @constructor
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
   */
  on(event, callback) {
    this.eventEmitter.on(event, callback);
  }
  /**
   * Emits information over an event.
   * @param {String} event the event.
   * @param  {...any} params the argument params sent to the event.
   * @returns {void}
   */
  emit(event, ...params) {
    this.eventEmitter.emit(event, ...params);
  } 
};
