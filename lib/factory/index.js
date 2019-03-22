/**
 * @author Jafeth Garcia
 */
const path = require('path');
const fs = require('fs');
const pathExists = require('path-exists');

const _extendRestManager = require('./rest-manager');
const { Logger, _isClass } = require('./../utils');
const { ErrorFactory } = require('./../error-factory');

let annotations = new Map();
let serviceOptions = undefined;
/**
 * Initializes global variables meant to be annotations
 * @private
 * @returns {void}
 */
function _initGlobalAnnotations() {
  global['$Endpoint'] = (objectOptions) => {
    annotations.set(objectOptions.object, objectOptions);
  };
}
/**
 * Loads endpoint objects
 * @param {Object} context the resitup context endpoint container
 * @param {Object} logger the logger instance
 * @private
 * @returns {void}
 */
function _loadEndpoints(context, logger) {
  let appDir = serviceOptions.appDir;
  if (!appDir) appDir = path.dirname(require.main.filename);
  const modulesPath = path.join(appDir, serviceOptions.endpointsPath);
  if (pathExists.sync(modulesPath)) {
    const moduleNames = fs.readdirSync(modulesPath);
    for (let moduleName of moduleNames) {
      const modulePath = path.join(modulesPath, moduleName);
      let typeClass = require(modulePath);
      if (_isClass(typeClass)) {
        if (annotations.has(typeClass.name)) {
          const annotationOptions = annotations.get(typeClass.name);
          const EndpointObject = _extendRestManager(typeClass);
          let newObject = new EndpointObject(serviceOptions);
          Object.assign(newObject, annotationOptions);
          context[typeClass.name] = newObject;
        } else {
          context[typeClass.name] = new typeClass();
        }
        context[typeClass.name].$logger = logger;
      }
    }
  } else {
    ErrorFactory.throwError('invalidEndpointsPath', modulesPath);
  }
}
/**
 * Factory initializes everything
 * @class
 */
class Factory {
  /**
   * Initializes the service
   * @param {Object} context the resitup context endpoint container 
   * @param {Object} options the entire service configuration
   * @static
   * @returns {void}
   */
  static init(context, options) {
    serviceOptions = options;
    const config = {};
    const loggerConfig = options.logger || {};
    const type = loggerConfig.type || 'RESTITUP';
    if (loggerConfig.appenders) {
      config.appenders = loggerConfig.appenders;
    }
    if (config.appenders) {
      config.categories = loggerConfig.categories || {
        default: {level: 'error', appenders: Object.keys(config.appenders)}
      };
    }
    const logger = Logger.getInstance(type, {});
    _initGlobalAnnotations();
    _loadEndpoints(context, logger);
  }
  /**
   * @returns {Map} annotations map
   */
  static get annotations() {
    return annotations;
  }
}

module.exports = { Factory };
