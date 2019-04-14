/**
 * @author Jafeth Garcia
 * @private
 */
/**
 * This function is a unit test helper, it will wrap an async callback function and provide error handling on it,
 * this will prevent unhandled promise rejections.
 * @param {function} callback - the async callback function used on unit test spec files
 * @returns {void}
 * @example 
 *  describe('unit tests for a feature', () => {
 *    it('some unit test', asyncSpec(async (done) => {
 *    throw new Error('failing for test');
 *    done();
 *  }));
 *  // code avoid will fail the test by calling done.fail(error) as asyncSpec handles the error, no unhandled promise rejection will be triggered.
 */
module.exports.asyncSpec = (callback) => async (done) => {
  try {
    await callback(done);
  } catch (error) {
    done.fail(error);
  }
};

module.exports.awaitTo = (promise) => promise.then(data => [null, data]).catch(error => [error]);
