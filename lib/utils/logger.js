/**
 * @author Jafeth Garcia
 */

const log4js= require('log4js');

const LOGS_TYPE = {
  INFO: 'info',
  DEBUG: 'debug',
  WARN: 'warn',
  ERROR: 'error'
};

let defaultLogger = log4js.getLogger();

/**
 * Whites the log on the appender and emits a log event.
 * @param {array} args - method arguments.
 * @param {string} logType - log key.
 * @return {void}
 */
function _writeMessage(args, logType) {
  const params = [...args].map(value => value);
  const message = params.join(' ');
  defaultLogger[logType](message);
}

/**
 * Logger handler.
 * @class
 */
class RestLogger {
  /**
  * It is a wrapper of 'logger.info' method.
  * @returns {void}
  */
  static info() {
    _writeMessage(arguments, LOGS_TYPE.INFO);
  }
  /**
  * It is a wrapper of 'logger.debug' method.
  * @returns {void}
  */
  static debug() {
    _writeMessage(arguments, LOGS_TYPE.DEBUG);
  }
  /**
  * It is a wrapper of 'logger.warn' method.
  * @returns {void}
  */
  static warn() {
    _writeMessage(arguments, LOGS_TYPE.WARN);
  }
  /**
  * It is a wrapper of 'logger.error' method.
  * @returns {void}
  */
  static error() {
    _writeMessage(arguments, LOGS_TYPE.ERROR);
  }
  /**
   * Sets the maximum log level. The default level is "info".
   * @param {String} level the logger level, 'fatal', 'error', 'warn', 'info', 'debug'
   * @returns {Boolean} returns true if the level was set properly and false otherwise
   */
  static setLevel(level) {
    return defaultLogger.setLevel(level);
  }
  /**
   * 
   * @param {Logger} logger - the new logger object instanace.
   * @returns {void}
   */
  static setLogger(logger) {
    if (logger instanceof Logger)
      defaultLogger = logger;
    else 
      throw new Error('Invalid logger instance.');
  }
}

module.exports = RestLogger;
