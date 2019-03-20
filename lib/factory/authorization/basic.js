/**
 * @author Jafeth Garcia
 */

module.exports = (_, _, config) => {
  const username = config.username || null;
  const password = config.password || null;

  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
};
