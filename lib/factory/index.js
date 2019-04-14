/**
 * @author Jafeth Garcia
 * @private
 */
const _extendRestManager = require('./rest-manager');
const path = require('path');
const fs = require('fs');
const pathExists = require('path-exists');

const { _isClass } = require('./../utils');
const { Logger } = require('./../modules/logger');
const { ErrorFactory } = require('./../error-factory');
const { HttpStatus } = require('./../modules/http-status-code');
const { asyncSpec, awaitTo } = require('./../modules/async-tools');

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
 * Loads endpoint objects.
 * @param {Object} context the resitup context endpoint container.
 * @param {Object} loggerOptions the logger instance configuration options.
 * @private
 * @returns {void}
 */
function _loadEndpoints(context, loggerOptions) {
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
        context[typeClass.name].$logger = Logger.getInstance(typeClass.name, loggerOptions);
      }
    }
  } else {
    ErrorFactory.throwError('invalidEndpointsPath', modulesPath);
  }
}
/**
 * Injects the framework common modules.
 * @param {Restitup} context the resitup context endpoint container.
 * @returns {void}
 */
function _loadModules(context) {
  context
    .module('$HttpStatus', HttpStatus)
    .module('$asyncSpec', asyncSpec)
    .module('$awaitTo', awaitTo);
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
    context.module('$logger', Logger.getInstance(type, config));
    _initGlobalAnnotations();
    _loadEndpoints(context, config);
    _loadModules(context);
  }
  /**
   * @returns {Map} annotations map
   */
  static get annotations() {
    return annotations;
  }
  /**
   * Kills global initiates variables, and puts factory to initial status, requires to start service again.
   * @returns {void}
   * @private
   * @protected
   */
  static _kill() {
    serviceOptions = undefined;
  }
}

module.exports = { Factory };
