/**
 * @author Jafeth Garcia
 */
/**
 * Verifies if the parameter is a Class
 * @param {object} func - some definiton of object.
 * @returns {boolean} true if the parameter is a funciton otherwise is false.
 * @private
 */
module.exports = function _isClass(func) {
  return (typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func)));
};
