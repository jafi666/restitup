/**
 * @author Jafeth Garcia
 */
const { EventEmitter } = require('events');

module.exports = (superClass) => class extends superClass {
  constructor() {
    super();
    this.eventEmitter = new EventEmitter();
  }

  on(event, callback) {
    this.eventEmitter.on(event, callback);
  }

  emit(event, ...params) {
    this.eventEmitter.emit(event, ...params);
  }
  
}