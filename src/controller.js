const ContainerAware = require('lapi-common').di.ContainerAware
const InvalidArgumentException = require('lapi-common').exception.InvalidArgumentException
import Request from './request'
import Response from './response'
import Route from './routing/route'

export default class Controller extends ContainerAware {
  /**
   * Constructor
   * @param {?Request} [request=null]
   * @param {?Response} [response=null]
   */
  constructor(request = null, response = null) {
    super()
    this.setRequest(request || new Request())
    this.setResponse(response || new Response())
  }

  /**
   * Get route
   * @returns {Route}
   */
  getRoute() {
    return this._route
  }

  /**
   * Set route
   * @param {!Route} route
   * @throws {InvalidArgumentException} throws an exception if route is not an instance of Route
   */
  setRoute(route) {
    if (route instanceof Route) {
      this._route = route
    } else {
      throw new InvalidArgumentException('[http.Controller#setRoute] route must be an instance of Route')
    }
  }

  /**
   * Get Request
   * @returns {Request}
   */
  getRequest() {
    return this._request
  }

  /**
   * Set Request
   * @param {Request} request
   * @throws {InvalidArgumentException} throws an exception when request is not an instance of Request
   */
  setRequest(request) {
    if (request instanceof Request) {
      this._request = request
    } else {
      throw new InvalidArgumentException('[http.Controller#setRequest] request must be an instance of Request')
    }
  }

  /**
   * Get Response
   * @returns {Response}
   */
  getResponse() {
    return this._response
  }

  /**
   * Set Response
   * @param {Response} response
   * @throws {InvalidArgumentException} throws an exception when response is not an instance of Response
   */
  setResponse(response) {
    if (response instanceof Response) {
      this._response = response
    } else {
      throw new InvalidArgumentException('[http.Controller#setResponse] request must be an instance of Response')
    }
  }

  /**
   * This implementation means to be a solution for quick routing in App.
   * Therefore, override this method is prohibited
   *
   * @param {function} action
   * @param {*} args
   * @returns {*}
   */
  action(action, ...args) {
    return action.apply(this, args)
  }
}