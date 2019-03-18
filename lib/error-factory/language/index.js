/**
 * @author Jafeth Garcia
 */
const language = process.env.LANGUAGE || 'en-us';
const messages = {
  'en-us': require('./en-us.json')
};

module.exports = messages[language];
