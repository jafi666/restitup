/**
 * @author Jafeth Garcia
 * @private
 */
const Emitter = require('./emitter');
const request = require('request').defaults({jar: true});
const authorization = require('./authorization');
const { Mixer } = require('./../utils');

// Symbols
const _apiUrl = Symbol('_apiUrl');
const _headers = Symbol('_headers');

/**
 * Function to execute request using request library.
 * @param {Object} options Configuration for request.
 * @returns {Promise} Promise resolved.
 * @private
 */
function _sendRequest(options) {
  return new Promise((resolve, reject) => {
    try {
      this.$logger.info(options.method, 'Performing request to:', options.uri);
      request(options, (error, res, data) => {
        if (error) {
          this.$logger.error(options.method, error.message);
          reject(error);
        } else {
          const responseData = {
            statusCode: res.statusCode,
            data: data
          };
          this.$logger.debug('Response status code:', res.statusCode, options.method, options.uri);
          if (_verifyJson(data)) {
            const dataToSend = data ? JSON.parse(data) : {};
            responseData.data = dataToSend;
          }
          this.emit('rest-request', responseData, options);
          resolve(responseData);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Function to verify if there is a valid Json object in a text.
 * @param {String} text Text with the Json object to validate.
 * @returns {Boolean} True if the text contains a valid Json Object otherwise false.
 * @private
 */
function _verifyJson(text) {
  return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
}
/**
 * Removes all back slashes from resources
 * @param {String} resource The endpoint resource.
 * @returns {String} The same resource without back slashes.
 */
function _clearSlash(resource) {
  while (`${resource}`.startsWith('/')) {
    resource = resource.slice(1);
  }
  return resource;
}
/**
 * Process a URL and forms the entire endpoint based on the paramters provided
 * @param {String} url The url to be processed.
 * @param {...any} params Arguments that may containt endpoint resource relation and their ids.
 * @returns {String} the URL completed
 */
function _processUrl(url, ...params) {
  const [resource, id, ...args] = params;
  if (resource) {
    url = `${url}/${_clearSlash(resource)}`;
    if (id) {
      url = `${url}/${id}`;
      if (args.length > 0) {
        return _processUrl(url, ...args);
      }
    }
    return url;
  }
  return url;
}

/**
 * Returns a function with returns a customized class.
 * @param {function} customClass the parent custom class.
 * @returns {Class} the custom class 
 * @private
 */
module.exports = (customClass) => {
  /**
   * Class to expose methods and perform requests to any API rest.
   * @class RestManager
   */
  return class extends Mixer(customClass).with(Emitter) {
    /**
     * Initializes the rest manager instance
     * @param {Object} options the configuration options.
     * @constructor
     * @memberof RestManager
     */
    constructor(options) {
      super();
      this._options = JSON.parse(JSON.stringify(options));
      this[_apiUrl] = function(resourceUri, id, ...params) {
        let url = `${this._options.apiUrl}${this._options.rootPath}`;
        if (resourceUri) url = _processUrl(url, resourceUri, id, ...params);
        else url = _processUrl(url, this.resourceUri, id, ...params);
        return url;
      };
      this[_headers] = function(method, uri, id, ...params) {
        const headers = JSON.parse(JSON.stringify(this._options.headers));
        const auth = authorization(method, this[_apiUrl](uri, id, ...params), this._options);
        if (auth) {
          this.$logger.debug(auth);
          headers['Authorization'] = auth;
        }
        return headers;
      };
    }
    /**
     * Function to execute get request on all resources.
     * @param {Object} options All acceptable options handle by npm "request".
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    get(options = {}) {
      options['method'] = 'GET';
      options['uri'] = this[_apiUrl](options.resourceUri);
      options['headers'] = this[_headers](options['method'], options.resourceUri);
      return _sendRequest.call(this, options);
    }

    /**
     * Function to execute post request.
     * @param {Object} body Content to send body parameters.
     * @param {Object} options All acceptable options handle by npm "request".
     * @returns {Object} Promise resolved by _sendRequest function.
     * @memberof RestManager
     */
    post(body = {}, options = {}) {
      options['method'] = 'POST';
      options['uri'] = this[_apiUrl](options.resourceUri);
      options['headers'] = this[_headers](options['method'], options.resourceUri);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }

    /**
     * Function to execute get request on one resource.
     * @param {Number} id The rest object identifier.
     * @param {Object} options All acceptable options handle by npm "request".
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    getOne(id, options = {}) {
      options['method'] = 'GET';
      options['uri'] = this[_apiUrl](options.resourceUri, id);
      options['headers'] = this[_headers](options['method'], options.resourceUri, id);
      return _sendRequest.call(this, options);
    }

    /**
     * Function to execute patch request.
     * @param {Number} id The rest object identifier.
     * @param {Object} body The payload body object.
     * @param {Object} options All acceptable options handle by npm "request".
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    patch(id, body = {}, options = {}) {
      options['method'] = 'PATCH';
      options['uri'] = this[_apiUrl](options.resourceUri, id);
      options['headers'] = this[_headers](options['method'], options.resourceUri, id);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    
    /**
     * Function to execute put request.
     * @param {Number} id The rest object identifier.
     * @param {Object} body The payload body object.
     * @param {Object} options All acceptable options handle by npm "request".
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    put(id, body = {}, options = {}) {
      options['method'] = 'PUT';
      options['uri'] = this[_apiUrl](options.resourceUri, id);
      options['headers'] = this[_headers](options['method'], options.resourceUri, id);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    
    /**
     * Function to execute delete request.
     * @param {Number} id The rest object identifier.
     * @param {Object} options All acceptable options handle by npm "request".
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    delete(id, options = {}) {
      options['method'] = 'DELETE';
      options['uri'] = this[_apiUrl](options.resourceUri, id);
      options['headers'] = this[_headers](options['method'], options.resourceUri, id);
      return _sendRequest.call(this, options);
    }
    /**
     * Function to execute get request on all resources that belongs to a relation.
     * @param {any} id The endpoint relation paraent identifier.
     * @param {String} resource The relation endpoint resources.
     * @param  {...any} params Arguments that may containt endpoint resource relation and their ids.
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    getRelation(id, resource, ...params) {
      const options = {};
      options['method'] = 'GET';
      options['uri'] = this[_apiUrl](undefined, id, resource, ...params);
      options['headers'] = this[_headers](options['method'], undefined, id, resource, ...params);
      return _sendRequest.call(this, options);
    }
    /**
     * Function to execute post request on a relation resource.
     * @param {any} id The endpoint relation paraent identifier.
     * @param {Object} body The payload body object.
     * @param {String} resource The relation endpoint resources.
     * @param  {...any} params Arguments that may containt endpoint resource relation and their ids.
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    postRelation(id, body = {}, resource, ...params) {
      const options = {};
      options['method'] = 'POST';
      options['uri'] = this[_apiUrl](undefined, id, resource, ...params);
      options['headers'] = this[_headers](options['method'], undefined, id, resource, ...params);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    /**
     * Function to execute put request on a relation resource.
     * @param {any} id The endpoint relation paraent identifier.
     * @param {Object} body The payload body object.
     * @param {String} resource The relation endpoint resources.
     * @param  {...any} params Arguments that may containt endpoint resource relation and their ids.
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    putRelation(id, body = {}, resource, ...params) {
      const options = {};
      options['method'] = 'PUT';
      options['uri'] = this[_apiUrl](undefined, id, resource, ...params);
      options['headers'] = this[_headers](options['method'], undefined, id, resource, ...params);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    /**
     * Function to execute patch request on a relation resource.
     * @param {any} id The endpoint relation paraent identifier.
     * @param {Object} body The payload body object.
     * @param {String} resource The relation endpoint resources.
     * @param  {...any} params Arguments that may containt endpoint resource relation and their ids.
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    patchRelation(id, body = {}, resource, ...params) {
      const options = {};
      options['method'] = 'PATCH';
      options['uri'] = this[_apiUrl](undefined, id, resource, ...params);
      options['headers'] = this[_headers](options['method'], undefined, id, resource, ...params);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    /**
     * Function to execute delete request on a relation resource.
     * @param {any} id The endpoint relation paraent identifier.
     * @param {String} resource The relation endpoint resources.
     * @param  {...any} params Arguments that may containt endpoint resource relation and their ids.
     * @returns {Object} resolves the response body data.
     * @memberof RestManager
     */
    deleteRelation(id, resource, ...params) {
      const options = {};
      options['method'] = 'DELETE';
      options['uri'] = this[_apiUrl](undefined, id, resource, ...params);
      options['headers'] = this[_headers](options['method'], undefined, id, resource, ...params);
      return _sendRequest.call(this, options);
    }
  };
};
