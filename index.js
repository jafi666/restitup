/**
 * @author Jafeth Garcia
 */
const { Restitup } = require('./lib/restitup');
const { ErrorFactory } = require('./lib/error-factory');
const { Factory } = require('./lib/factory');
const { HttpStatus } = require('./lib/utils');

const through2 = require('through2');

let options = require('./lib/options') ;
let instance = undefined;

class Service {
  static Gulp(configuration) {
    return through2.obj((file, _, cb) => {
      configuration.appDir = file.path;
      Service.Start(configuration);
      cb(null, file)
    });
  }

  static Start(configuration) {
    if (!instance) {
      options = { ...options, ...configuration };
      instance = new Restitup(options);
      Factory.init(instance, options);
    }
  }

  static get Restitup() {
    if (!instance) {
      ErrorFactory.throwError('serviceNotStarted');
    } 
    return instance;
  }
  
  static get ErrorFactory() {
    return ErrorFactory;
  }

  static get HttpStatus() {
    return HttpStatus;
  }
}

module.exports = Service;