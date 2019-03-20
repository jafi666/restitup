/**
 * @author Jafeth Garcia
 */
const path = require('path');
const fs = require('fs');
const pathExists = require('path-exists');

const _extendRestManager = require('./rest-manager');
const { Logger, _isClass } = require('./../utils');

let annotations = new Map();
let serviceOptions = undefined;

function _initGlobalAnnotations() {
  global['$Endpoint'] = (options) => {
    annotations.set(options.object, options);
  };
}

function _loadEndpoints(context, filePath, appDir) {
  if (!appDir) appDir = path.dirname(require.main.filename);
  const modulesPath = path.join(appDir, filePath);
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
          newObject.$logger = Logger;
          context[typeClass.name] = newObject
        } else {
          context[typeClass.name] = new typeClass();
        }
      }
    }
  } else {
    throw new Error('Invalid endpoints path provided: ' + modulesPath );
  }
}

class Factory {
  static init(context, options) {
    serviceOptions = options;
    _initGlobalAnnotations();
    _loadEndpoints(context, options.endpointsPath, options.appDir);
  }

  static get annotations() {
    return annotations;
  }

}

module.exports = { Factory }