'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lapiCommon = require('lapi-common');

var _url = require('url');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Http Request URI
 *
 * Contains information about request's uri
 */
var Uri = function (_Bag) {
  _inherits(Uri, _Bag);

  /**
   * Constructor
   */
  function Uri(uri) {
    _classCallCheck(this, Uri);

    var _this = _possibleConstructorReturn(this, (Uri.__proto__ || Object.getPrototypeOf(Uri)).call(this));

    if (uri instanceof _lapiCommon.Bag) {
      _this.replace(uri.all());
    } else if ((typeof uri === 'undefined' ? 'undefined' : _typeof(uri)) === 'object') {
      _this.replace(uri);
    } else if (typeof uri === 'string') {
      var url = new _url.Url();
      var info = url.parse(uri, true);
      _this.set(Uri.PROTOCOL, info.protocol);
      _this.set(Uri.HOST, info.hostname);
      _this.set(Uri.PORT, parseInt(info.port));
      _this.set(Uri.PATH, info.pathname);
      _this.set(Uri.HASH, info.hash);
      _this.set(Uri.HREF, info.href);
      _this.set(Uri.SEARCH, info.search);
      _this.setQuery(info.query);
    }
    return _this;
  }

  /**
   * Get request's query
   * @returns {Bag}
   */


  _createClass(Uri, [{
    key: 'getQuery',
    value: function getQuery() {
      return this._query;
    }

    /**
     * Set request's query
     * @param {Bag|Object|string} query
     */

  }, {
    key: 'setQuery',
    value: function setQuery(query) {
      if (query instanceof _lapiCommon.Bag) {
        this._query = query;
      } else if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        this._query = new _lapiCommon.Bag(query);
      } else if (typeof query === 'string') {
        var url = new _url.Url();
        this._query = new _lapiCommon.Bag(url.parse(query, true).query);
      } else {
        throw new Error('The query of request must be either a string, an instance of Bag or an object.');
      }
    }

    /**
     * Returns uri as a string
     * @returns {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      var url = new _url.Url();
      url.protocol = this.get(Uri.PROTOCOL);
      url.hostname = this.get(Uri.HOST);
      url.port = this.get(Uri.PORT);
      url.pathname = this.get(Uri.PATH);
      url.hash = this.get(Uri.HASH);
      url.search = this.get(Uri.SEARCH);

      return url.format();
    }
  }]);

  return Uri;
}(_lapiCommon.Bag);

exports.default = Uri;

Uri.PROTOCOL = 'protocol';
Uri.HOST = 'host';
Uri.PORT = 'port';
Uri.PATH = 'path';
Uri.HASH = 'hash';
Uri.HREF = 'href';
Uri.SEARCH = 'search';