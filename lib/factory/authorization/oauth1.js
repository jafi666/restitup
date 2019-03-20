/**
 * @author Jafeth Garcia
 */
const SIGNATURE_METHOD = 'HMAC-SHA1';
const OAUTH_VERSION = '1.0';
const { OAuth } = require('oauth');

let oauth = undefined;

module.exports = (method, url, config) => {
  if (!oauth) {
    const requestUrl = config.requestUrl || null;
    const accessUrl = config.accessUrl || null;
    const consumerKey = config.consumerKey || null;
    const consumerSecret = config.consumerSecret || null;
    const version = config.version || OAUTH_VERSION;
    const authorizeCallback = config.authorizeCallback || null;
    const signatureMethod = config.signatureMethod || SIGNATURE_METHOD;

    oauth = new OAuth(requestUrl, accessUrl, consumerKey, consumerSecret, version, authorizeCallback, signatureMethod);
  }
  const oauthToken = config.oauthToken || null;
  const oauthTokenSecret = config.oauthTokenSecret || null;

  return oauth.authHeader(url, oauthToken, oauthTokenSecret, method);
};
