/**
 * @author Jafeth Garcia
 */
const request = require('request').defaults({jar: true});

/**
 * Function to execute request using request library.
 * @param {Object} options Configuration for request.
 * @returns {Promise} Promise resolved.
 */
async function _sendRequest(options) {
  request(options, (error, res, data) => {
    if (error) {
      throw error;
    } else {
      let responseData = {
        statusCode: res.statusCode,
        data: data
      };
      if (_verifyJson(data)) {
        let dataToSend = data ? JSON.parse(data) : {};
        responseData.data = dataToSend;
      }
      return responseData;
    }
  });
}

/**
 * Function to verify if there is a valid Json object in a text.
 * @param {String} text - Text with the Json object to validate.
 * @returns {Boolean} True if the text contains a valid Json Object otherwise false.
 */
function _verifyJson(text) {
  return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
}

/**
 * Class to expose methods to perform requests.
 * @class RequestManager
 */
class RequestManager {

  /**
   * Function to execute get request.
   *
   * @static
   * @param {String} uri - the rest api uri
   * @param {Object} options - all acceptable options handle by npm "request"
   * @returns {Object} resolves the response body data
   */
  async static get(uri, options = {}) {
    options['method'] = 'GET';
    options['uri'] = uri;
    return await _sendRequest(options);
  }

  /**
   * Function to execute post request.
   * @static
   * @param {String} uri Path to make request.
   * @param {Object} [body={}] Content to send body parameters.
   * @param {Object} [options={}] Extra configuration for the request.
   * @returns {Object} Promise resolved by _sendRequest function.
   *
   * @memberOf RequestManager
   */
  async static post(uri, body = {}, options = {}) {
    options['method'] = 'POST';
    options['uri'] = uri;
    options['body'] = JSON.stringify(body);
    return await _sendRequest(options);
  }

  /**
   * Function to execute patch request.
   *
   * @static
   * @param {string} uri - the rest api uri
   * @param {object} body - the payload body object
   * @param {object} options - all acceptable options handle by npm "request"
   * @returns {Promise} resolves the response body data
   */
  async static patch(uri, body = {}, options = {}) {
    options['method'] = 'PATCH';
    options['uri'] = uri;
    options['body'] = JSON.stringify(body);
    return await _sendRequest(options);
  }
  
  /**
   * Function to execute put request.
   *
   * @static
   * @param {string} uri - the rest api uri
   * @param {object} body - the payload body object
   * @param {object} options - all acceptable options handle by npm "request"
   * @returns {Promise} resolves the response body data
   */
  async static put(uri, body = {}, options = {}) {
    options['method'] = 'PUT';
    options['uri'] = uri;
    options['body'] = JSON.stringify(body);
    return await _sendRequest(options);
  }
  
  /**
   * Function to execute get request.
   *
   * @static
   * @param {string} uri - the rest api uri
   * @param {object} options - all acceptable options handle by npm "request"
   * @returns {Promise} resolves the response body data
   */
  async static delete(uri, options = {}) {
    options['method'] = 'DELETE';
    options['uri'] = uri;
    return await _sendRequest(options);
  }

}

module.exports = { RequestManager };
