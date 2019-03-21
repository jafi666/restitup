/**
 * @author Jafeth Garcia
 */
const DEFAULT = 'en-us';
const language = process.env.LANGUAGE || DEFAULT;
const messages = {
  'en-us': require('./en-us.json'),
  'es-es': require('./es-es.json')
};

module.exports = messages[language] ? messages[language] : messages[DEFAULT];
