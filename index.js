/**
 * @author Jafeth Garcia
 */
const { Restitup } = require('./lib/restitup');

let options = require('./lib/options') ;
let instance = undefined;

class Service {

  static Restitup() {
    if (!instance) {
      options = { ...options, ...configuration };
      instance = new Restitup(options);
    } 
    return instance;
  }
  
}

module.exports = Service;