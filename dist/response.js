'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotImplementedException = require('lapi-common').exception.NotImplementedException;

/**
 * HTTP Response
 */
var Response = function (_Message) {
  _inherits(Response, _Message);

  /**
   * Constructor
   * @param {?(string|Object)} [content={}] Response's body content
   * @param {!number} [statusCode=200] Response's status code, default is OK
   * @param {?Object} [header={}] Initial headers
   */
  function Response() {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Response.HTTP_OK;
    var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Response);

    var _this = _possibleConstructorReturn(this, (Response.__proto__ || Object.getPrototypeOf(Response)).call(this));

    _this.getBody().setContent(content);
    _this.setStatusCode(statusCode);
    _this.getHeader().extend(header);
    return _this;
  }

  /**
   * Get HTTP Status Code
   * @returns {number}
   */


  _createClass(Response, [{
    key: 'getStatusCode',
    value: function getStatusCode() {
      return this._statusCode;
    }

    /**
     * Set HTTP Status Code
     * @param {!number} statusCode
     */

  }, {
    key: 'setStatusCode',
    value: function setStatusCode(statusCode) {
      this._statusCode = statusCode;
    }

    /**
     * Set body content
     * @param {*} content
     */

  }, {
    key: 'setContent',
    value: function setContent(content) {
      throw new NotImplementedException();
    }

    /**
     * Get body content
     * @returns {*}
     */

  }, {
    key: 'getContent',
    value: function getContent() {
      throw new NotImplementedException();
    }

    /**
     * Send response to client
     * @param {?Object} resource Original response's resource. It should be an instance of http.ServerResponse
     */

  }, {
    key: 'send',
    value: function send() {
      var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.getHeader().set(_header2.default.CONTENT_TYPE, this.getBody().getContentType());
      this.getHeader().forEach(function (key, value) {
        resource.setHeader(key, value);
      });

      resource.statusCode = this.getStatusCode();
      resource.end(this.getBody().toString());
    }

    /**
     * Create a response from resource
     * @param {*} resource
     * @returns {Promise}
     */

  }], [{
    key: 'from',
    value: function from(resource) {
      var _this2 = this;

      if (resource === null || (typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) !== 'object') {
        throw new Error('The resource of response must be an object.');
      }

      return new Promise(function (resolve, reject) {
        var response = new Response();
        _this2._setUpHeader(response, resource);
        _this2._setUpBody(response, resource).then(function () {
          resolve(response);
        }).catch(function (e) {
          return reject(e);
        });
      });
    }

    /**
     * Setup Header
     * @param {Response} response
     * @param {*} resource
     * @private
     */

  }, {
    key: '_setUpHeader',
    value: function _setUpHeader(response, resource) {
      Object.keys(resource.headers).forEach(function (key) {
        return response.getHeader().set(key, resource.headers[key]);
      });
      response.getBody().setContentType(response.getHeader().get(_header2.default.CONTENT_TYPE));
      response.setStatusCode(resource.statusCode);
    }

    /**
     * Setup Body Content
     * @param {Response} response
     * @param {*} resource
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_setUpBody',
    value: function _setUpBody(response, resource) {
      return new Promise(function (resolve, reject) {
        var data = '';
        resource.on('data', function (chunk) {
          return data += chunk;
        });
        resource.on('end', function () {
          response.getBody().setContent(data);
          resolve();
        });
        resource.on('error', function (e) {
          return reject(e);
        });
      });
    }
  }]);

  return Response;
}(_message2.default);

exports.default = Response;

Response.HTTP_OK = 200;
Response.HTTP_CREATED = 201;
Response.HTTP_ACCEPTED = 202;
Response.HTTP_NO_CONTENT = 204;
Response.HTTP_RESET_CONTENT = 205;
Response.HTTP_MOVED_PERMANENTLY = 301;
Response.HTTP_FOUND = 302;
Response.HTTP_NOT_MODIFIED = 304;
Response.HTTP_BAD_REQUEST = 400;
Response.HTTP_UNAUTHORIZED = 401;
Response.HTTP_FORBIDDEN = 403;
Response.HTTP_NOT_FOUND = 404;
Response.HTTP_METHOD_NOT_ALLOWED = 404;
Response.HTTP_REQUEST_TIMEOUT = 408;
Response.HTTP_TOO_MANY_REQUESTS = 429;
Response.HTTP_INTERNAL_ERROR = 500;
Response.HTTP_NOT_IMPLEMENTED = 501;
Response.HTTP_BAD_GATEWAY = 502;
Response.HTTP_SERVICE_UNAVAILABLE = 503;
Response.HTTP_GATEWAY_TIMEOUT = 504;