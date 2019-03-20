/**
 * @author Jafeth Garcia
 */

module.exports = (_, _, config) => {
  const token = config.token || null;
  return `Bearer ${token}`;
};
