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
 * @param {String} text - Text with the Json object to validate.
 * @returns {Boolean} True if the text contains a valid Json Object otherwise false.
 * @private
 */
function _verifyJson(text) {
  return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
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
     * @param {Object} options the configuration options
     * @constructor
     * @memberof RestManager
     */
    constructor(options) {
      super();
      this._options = options;
      this[_apiUrl] = function(uri) {
        return `${this._options.apiUrl}${this._options.rootPath}${uri}`;
      };
      this[_headers] = function(method, uri) {
        const headers = JSON.parse(JSON.stringify(this._options.headers));
        const auth = authorization(method, this[_apiUrl](uri), this._options);
        if (auth) {
          headers['Authorization'] = auth;
        }
        return headers;
      };
    }
    /**
     * Function to execute get request.
     * @param {String} uri - the rest api uri
     * @param {Object} options - all acceptable options handle by npm "request"
     * @returns {Object} resolves the response body data
     * @memberof RestManager
     */
    get(uri, options = {}) {
      options['method'] = 'GET';
      options['uri'] = this[_apiUrl](uri);
      options['headers'] = this[_headers](options['method'], uri);
      return _sendRequest.call(this, options);
    }

    /**
     * Function to execute post request.
     * @param {String} uri Path to make request.
     * @param {Object} [body={}] Content to send body parameters.
     * @param {Object} [options={}] Extra configuration for the request.
     * @returns {Object} Promise resolved by _sendRequest function.
     * @memberof RestManager
     */
    post(uri, body = {}, options = {}) {
      options['method'] = 'POST';
      options['uri'] = this[_apiUrl](uri);
      options['headers'] = this[_headers](options['method'], uri);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }

    /**
     * Function to execute patch request.
     * @param {string} uri - the rest api uri
     * @param {object} body - the payload body object
     * @param {object} options - all acceptable options handle by npm "request"
     * @returns {Object} resolves the response body data
     * @memberof RestManager
     */
    patch(uri, body = {}, options = {}) {
      options['method'] = 'PATCH';
      options['uri'] = this[_apiUrl](uri);
      options['headers'] = this[_headers](options['method'], uri);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    
    /**
     * Function to execute put request.
     * @param {string} uri - the rest api uri
     * @param {object} body - the payload body object
     * @param {object} options - all acceptable options handle by npm "request"
     * @returns {Object} resolves the response body data
     * @memberof RestManager
     */
    put(uri, body = {}, options = {}) {
      options['method'] = 'PUT';
      options['uri'] = this[_apiUrl](uri);
      options['headers'] = this[_headers](options['method'], uri);
      options['body'] = JSON.stringify(body);
      return _sendRequest.call(this, options);
    }
    
    /**
     * Function to execute get request.
     * @param {string} uri - the rest api uri
     * @param {object} options - all acceptable options handle by npm "request"
     * @returns {Object} resolves the response body data
     * @memberof RestManager
     */
    delete(uri, options = {}) {
      options['method'] = 'DELETE';
      options['uri'] = this[_apiUrl](uri);
      options['headers'] = this[_headers](options['method'], uri);
      return _sendRequest.call(this, options);
    }
  };
};
