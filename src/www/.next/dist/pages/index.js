'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* globals issuemd fetch */
var Main = function (_React$Component) {
  (0, _inherits3.default)(Main, _React$Component);

  function Main(props) {
    (0, _classCallCheck3.default)(this, Main);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).call(this, props));

    _this.state = {
      server: null,
      issuemd: null
    };
    return _this;
  }

  (0, _createClass3.default)(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/config').then(function (r) {
        return r.json();
      }).then(function (config) {
        return _this2.setState({
          server: config.version,
          issuemd: issuemd.version
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state;
      return _react2.default.createElement('div', null, _react2.default.createElement(_head2.default, null, _react2.default.createElement('title', null, 'issue.md website'), _react2.default.createElement('script', { src: '/issuemd.min.js' })), _react2.default.createElement('div', { className: 'container' }, _react2.default.createElement('div', { className: 'row' }, _react2.default.createElement('div', { className: 'col-sm-12 text-center padding-top-large' }, _react2.default.createElement('a', { href: 'https://github.com/issuemd/issue.md' }, _react2.default.createElement('div', null, _react2.default.createElement('img', { src: '/static/img/issuemd-logo.png', alt: 'issue.md logo' })), _react2.default.createElement('div', null, 'fork me on github...')), _react2.default.createElement('small', null, state.server && 'server: ' + state.server + ', issuemd: ' + state.issuemd)))));
    }
  }]);
  return Main;
}(_react2.default.Component);

exports.default = Main;