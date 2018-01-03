import {Bag} from 'lapi-common'
import {Url} from 'url'

/**
 * Http Request URI
 *
 * Contains information about request's uri
 */
export default class Uri extends Bag {
  /**
   * Constructor
   */
  constructor(uri) {
    super()
    if (uri instanceof Bag) {
      this.replace(uri.all())
    } else if (typeof uri === 'object') {
      this.replace(uri)
    } else if (typeof uri === 'string') {
      const url = new Url()
      const info = url.parse(uri, true)
      this.set(Uri.PROTOCOL, info.protocol)
      this.set(Uri.HOST, info.hostname)
      this.set(Uri.PORT, parseInt(info.port))
      this.set(Uri.PATH, info.pathname)
      this.set(Uri.HASH, info.hash)
      this.set(Uri.HREF, info.href)
      this.set(Uri.SEARCH, info.search)
      this.setQuery(info.query)
    }
  }

  /**
   * Get request's query
   * @returns {Bag}
   */
  getQuery() {
    return this._query
  }

  /**
   * Set request's query
   * @param {Bag|Object|string} query
   */
  setQuery(query) {
    if (query instanceof Bag) {
      this._query = query
    } else if (typeof query === 'object') {
      this._query = new Bag(query)
    } else if (typeof query === 'string') {
      const url = new Url()
      this._query = new Bag(url.parse(query, true).query)
    } else {
      throw new Error('The query of request must be either a string, an instance of Bag or an object.')
    }
  }

  /**
   * Returns uri as a string
   * @returns {string}
   */
  toString() {
    const url = new Url()
    url.protocol = this.get(Uri.PROTOCOL)
    url.hostname = this.get(Uri.HOST)
    url.port = this.get(Uri.PORT)
    url.pathname = this.get(Uri.PATH)
    url.hash = this.get(Uri.HASH)
    url.search = this.get(Uri.SEARCH)

    return url.format()
  }
}
Uri.PROTOCOL = 'protocol'
Uri.HOST = 'host'
Uri.PORT = 'port'
Uri.PATH = 'path'
Uri.HASH = 'hash'
Uri.HREF = 'href'
Uri.SEARCH = 'search'
