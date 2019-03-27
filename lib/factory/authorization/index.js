/**
 * @author Jafeth Garcia
 * @private
 */
const fs = require('fs');
const path = require('path');

const strategiesPath = path.join(__dirname);
const strategyFileNames = fs.readdirSync(strategiesPath);
const strategies = {};
for (let strategyFile of strategyFileNames) {
  if (strategyFile.search('index.js') === -1) {
    strategies[strategyFile] = require(`./${strategyFile}`);
  }
}
/**
 * Gets an authorization code based on the strategy selected by configuration.
 * @param {String} method the request method.
 * @param {String} url the request endpoint url.
 * @param {Object} options the service configuration options.
 * @returns {String} the authorization formatted code.
 * @function authorization
 * @global
 * @example
 * method = 'GET'
 * url = 'http//localhost/api/v1/users'
 * options = {
 *   authorization: {
 *     strategy: 'basic',
 *     basic: {
 *       username: 'foo',
 *       password: 'bar'
 *     }
 *   }
 * }
 * 
 * authorization(method. url, options) // should return Basic Zm9vOmJhcg==
 */
module.exports = (method, url, options) => {
  const strategy = options.authorization.strategy;
  const strategyOptions = options.authorization[strategy];
  if (!strategyOptions) return undefined;
  return strategies[`${strategy}.js`](method, url, strategyOptions);
};
