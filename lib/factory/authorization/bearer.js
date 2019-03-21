/**
 * @author Jafeth Garcia
 */

module.exports = (_, __, config) => {
  const token = config.token || null;
  return `Bearer ${token}`;
};
