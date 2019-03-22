/**
 * @author Jafeth Garcia
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
 * Gets an authorization strategy.
 * @param {String} method the request method.
 * @param {String} url the request endpoint url.
 * @param {Object} options the service configuration options.
 * @returns {String} the authorization formatted code.
 */
module.exports = (method, url, options) => {
  const strategy = options.authorization.strategy;
  const strategyOptions = options.authorization[strategy];
  if (!strategyOptions) return undefined;
  return strategies[`${strategy}.js`](method, url, strategyOptions);
};
