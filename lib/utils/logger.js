/**
 * @author Jafeth Garcia
 */

const log4js = require('log4js');
const _isEmpty = require('./is-empty');

const LOGS_TYPE = {
  INFO: 'info',
  DEBUG: 'debug',
  WARN: 'warn',
  ERROR: 'error'
};

let defaultLogger = undefined;

/**
 * Whites the log on the appender and emits a log event.
 * @param {array} args - method arguments.
 * @param {string} logType - log key.
 * @return {void}
 * @private
 */
function _writeMessage(args, logType) {
  const params = [...args].map(value => value);
  const message = params.join(' ');
  this.logger[logType](message);
}

/**
 * Logger handler.
 * @class
 */
class RestLogger {
  /**
   * Gets an instance of RestLogger
   * @param {String} type log4j type
   * @param {Object} config log4j configuration object
   * @returns {RestLogger} the single instance
   * @static
   */
  static getInstance(type, config) {
    if (!defaultLogger) {
      defaultLogger = new RestLogger(type, config);
    }
    return defaultLogger;
  }
  /**
   * Initializes a new instance
   * @param {String} type log4j type
   * @param {Object} config log4j configuration object
   * @constructor
   */
  constructor(type, config = {}) {
    if (!_isEmpty(config)) {
      log4js.configure(config);
    }
    this.logger = log4js.getLogger(type);
  }
  /**
  * It is a wrapper of 'logger.info' method.
  * @returns {void}
  */
  info() {
    _writeMessage.call(this, arguments, LOGS_TYPE.INFO);
  }
  /**
  * It is a wrapper of 'logger.debug' method.
  * @returns {void}
  */
  debug() {
    _writeMessage.call(this, arguments, LOGS_TYPE.DEBUG);
  }
  /**
  * It is a wrapper of 'logger.warn' method.
  * @returns {void}
  */
  warn() {
    _writeMessage.call(this, arguments, LOGS_TYPE.WARN);
  }
  /**
  * It is a wrapper of 'logger.error' method.
  * @returns {void}
  */
  error() {
    _writeMessage.call(this, arguments, LOGS_TYPE.ERROR);
  }
  /**
   * Sets the maximum log level. The default level is "info".
   * @param {String} level the logger level, 'fatal', 'error', 'warn', 'info', 'debug'
   * @returns {Boolean} returns true if the level was set properly and false otherwise
   */
  setLevel(level) {
    return this.logger.setLevel(level);
  }
}

module.exports = RestLogger;
