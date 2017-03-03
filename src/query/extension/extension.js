const Extension = require('lapi-common').Extension
export default class QueryExtension extends Extension {
  /**
   * Return a list of supporting rule's names
   * @returns {Array}
   */
  register() {
    throw new Error('[QueryExtension#register] register must be implemented')
  }
}