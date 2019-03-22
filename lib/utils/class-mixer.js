/**
 * @author Jafeth Garcia
 */
/**
 * Mixes classes
 * @class
 */
class MixinBuilder {
  /**
   * Initializes the mixin builder
   * @param {Class} superclass the super class.
   * @constructor
   */
  constructor(superclass) {
    this.superclass = superclass;
  }
  /**
   * Retrieves the classes to mix the super class up.
   * @param  {...any} mixins an array of classes.
   * @returns {Class} a mixed class
   */
  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}

module.exports = (superclass) => new MixinBuilder(superclass);
