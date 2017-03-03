const url = require('url')
const Bag = require('lapi-common').Bag
import Message from './message'
import Header from './header'
import Body from './body'

/**
 * Http Request
 *
 * Contains information about request
 */
export default class Request extends Message {
  /**
   * Constructor
   */
  constructor() {
    super()
    this.setMethod(Request.DEFAULT_METHOD)
    this.setUri(new Bag())
    this.setQuery(new Bag())
    this.setServer(new Bag())
    this.setClient(new Bag())
    this.setAttributes(new Bag())
  }

  /**
   * Get request's method
   * @returns {string}
   */
  getMethod() {
    return this._method
  }

  /**
   * Set request's method
   * @param {!string} method
   */
  setMethod(method) {
    this._method = method
  }

  /**
   * Get URI
   * @returns {Bag}
   */
  getUri() {
    return this._uri
  }

  /**
   * Set URI
   * @param {!string|Bag|Object} uri
   */
  setUri(uri) {
    if (uri instanceof Bag) {
      this._uri = uri
    } else if (typeof uri === 'object') {
      this._uri = new Bag(uri)
    } else if (typeof uri === 'string') {
      const info = url.parse(uri, true)
      this._uri.set(Request.URI_PROTOCOL, info.protocol)
      this._uri.set(Request.URI_HOST, info.hostname)
      this._uri.set(Request.URI_PORT, parseInt(info.port))
      this._uri.set(Request.URI_PATH, info.pathname)
      this._uri.set(Request.URI_HASH, info.hash)
      this._uri.set(Request.URI_HREF, info.href)
      this._uri.set(Request.URI_SEARCH, info.search)
      this.setQuery(info.query)
    } else {
      throw new Error('The request\'s URI must be an instance of Bag, an object or a string.')
    }
  }

  /**
   * Get attributes
   * @returns {Bag}
   */
  getAttributes() {
    return this._attributes
  }

  /**
   * Set attributes
   * @param {Object|Bag} attributes
   */
  setAttributes(attributes) {
    if (attributes instanceof Bag) {
      this._attributes = attributes
    } else if (typeof attributes === 'object') {
      this._attributes = new Bag(attributes)
    } else {
      throw new Error('Attributes of request must be either an instance of Bag or an object')
    }
  }

  /**
   * Get path from Uri
   * @returns {string}
   */
  getPath() {
    return this.getUri().get(Request.URI_PATH, Request.DEFAULT_PATH)
  }

  /**
   * Get host
   * @returns {string|null}
   */
  getHost() {
    return this.getUri().get(Request.URI_HOST)
  }

  /**
   * Get port
   * @returns {int}
   */
  getPort() {
    return this.getUri().get(Request.URI_PORT)
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
      this._query = new Bag(url.parse(query, true).query)
    } else {
      throw new Error('The query of request must be either a string, an instance of Bag or an object.')
    }
  }

  /**
   * Return a specific key if exists in request
   * @param {!string} key
   * @param {?*} [def=null] Default value to return if key does not exist
   * @returns {*}
   */
  get(key, def = null) {
    if (this.getAttributes().has(key)) {
      return this.getAttributes().get(key)
    } else if (this.getQuery().has(key)) {
      return this.getQuery().get(key)
    } else {
      return def
    }
  }

  /**
   * Tells whether or not a key exists in request
   * @param {!string} key
   * @returns {boolean}
   */
  has(key) {
    return !!(this.getAttributes().has(key) || this.getQuery().has(key))
  }

  /**
   * Set an attribute by key
   * @param {!string} key
   * @param {*} [value=null]
   */
  set(key, value = null) {
    this.getAttributes().set(key, value)
  }

  /**
   * Return server's information
   * @returns {Bag}
   */
  getServer() {
    return this._server
  }

  /**
   * Set server's information
   * @param {Bag|Object} [server={}]
   */
  setServer(server = {}) {
    if (server instanceof Bag) {
      this._server = server
    } else if (typeof server === 'object') {
      this._server = new Bag(server)
    } else {
      throw new Error('The request\'s server information must be either an instance of Bag or an object.')
    }
  }

  /**
   * Return client's information
   * @returns {Bag}
   */
  getClient() {
    return this._client
  }

  /**
   * Set client's information
   * @param {Bag|Object} [client={}]
   */
  setClient(client = {}) {
    if (client instanceof Bag) {
      this._client = client
    } else if (typeof client === 'object') {
      this._client = new Bag(client)
    } else {
      throw new Error('The request\'s client information must be either an instance of Bag or an object.')
    }
  }

  /**
   * Set Request content
   * @param {string|Object} content
   * @param {string} [contentType="application/json"]
   */
  setContent(content, contentType = Body.CONTENT_JSON) {
    if (typeof content === 'object') {
      content = JSON.stringify(content)
    }
    this.setBody(new Body(content, contentType))
  }

  /**
   * Get Request content
   * @returns {string}
   */
  getContent() {
    return this.getBody().getContent()
  }

  /**
   * Create an instance of Request from a specific resource
   * @param {!Object} resource Original resource, it should be an instance of http.IncomingMessage
   * @returns {Request}
   */
  static from(resource) {
    if (resource === null || typeof resource !== 'object') {
      throw new Error('The resource of request must be an object.')
    }

    let request = new Request()
    this._setUpMethod(request, resource)
    this._setUpHeader(request, resource)
    this._setUpUri(request, resource)
    this._setUpServer(request, resource)
    this._setUpClient(request, resource)

    return request
  }

  /**
   * Set up header from resource
   * @param {!Request} request
   * @param {!Object} resource
   * @private
   */
  static _setUpHeader(request, resource) {
    if (resource.rawHeaders !== undefined) {
      for (let i = 0; i < resource.rawHeaders.length; i++) {
        request.getHeader().set(resource.rawHeaders[i], resource.rawHeaders[++i])
      }
    }
  }

  /**
   * Setup URI from resource's url
   * @param {!Request} request
   * @param {!Object} resource
   * @private
   */
  static _setUpUri(request, resource) {
    if (resource.url !== undefined) {
      request.setUri(`http://${request.getHeader().get(Header.HOST)}${resource.url}`)
    }
  }

  /**
   * Set up method of request
   * @param {!Request} request
   * @param {!Object} resource
   * @private
   */
  static _setUpMethod(request, resource) {
    if (resource.method !== undefined) {
      request.setMethod(resource.method)
    }
  }

  /**
   * Set up information about request's server
   * @param {!Request} request
   * @param {!Object} resource
   * @private
   */
  static _setUpServer(request, resource) {
    if (resource.connection !== undefined) {
      const connection = resource.connection
      request.getServer().set(Request.SERVER_HOST, connection.address().address)
      request.getServer().set(Request.SERVER_PORT, connection.address().port)
      request.getServer().set(Request.ADDRESS_FAMILY, connection.address().family)
      request.getServer().set(Request.LOCAL_HOST, connection.localAddress)
      request.getServer().set(Request.LOCAL_PORT, connection.localPort)
    }
  }

  /**
   * Set up information about request's client source
   * @param {!Request} request
   * @param {!Object} resource
   * @private
   */
  static _setUpClient(request, resource) {
    if (resource.connection !== undefined) {
      const connection = resource.connection
      request.getClient().set(Request.CLIENT_HOST, connection.remoteAddress)
      request.getClient().set(Request.CLIENT_PORT, connection.remotePort)
      request.getClient().set(Request.ADDRESS_FAMILY, connection.remoteFamily)
    }
  }
}
Request.METHOD_GET    = 'GET'
Request.METHOD_POST   = 'POST'
Request.METHOD_PUT    = 'PUT'
Request.METHOD_PATCH  = 'PATCH'
Request.METHOD_DELETE = 'DELETE'
Request.METHOD_HEAD   = 'HEAD'
Request.METHOD_OPTION = 'OPTION'

Request.DEFAULT_METHOD = 'GET'
Request.DEFAULT_PATH   = '/'

Request.ADDRESS_FAMILY = 'family'
Request.ADDRESS_HOST   = 'host'
Request.ADDRESS_PORT   = 'port'
Request.SERVER_HOST    = Request.ADDRESS_HOST
Request.SERVER_PORT    = Request.ADDRESS_PORT
Request.CLIENT_HOST    = Request.ADDRESS_HOST
Request.CLIENT_PORT    = Request.ADDRESS_PORT
Request.LOCAL_HOST     = Request.ADDRESS_HOST
Request.LOCAL_PORT     = Request.ADDRESS_PORT
Request.URI_PROTOCOL   = 'protocol'
Request.URI_HOST       = 'host'
Request.URI_PORT       = 'port'
Request.URI_PATH       = 'path'
Request.URI_HASH       = 'hash'
Request.URI_HREF       = 'href'
Request.URI_SEARCH     = 'search'
