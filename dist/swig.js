'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _swig = require('swig');

var _swigExtras = require('swig-extras');

var _swigExtras2 = _interopRequireDefault(_swigExtras);

var swig = new _swig.Swig();
exports['default'] = swig;

_swigExtras2['default'].useFilter(swig, 'split');
_swigExtras2['default'].useFilter(swig, 'trim');
_swigExtras2['default'].useFilter(swig, 'groupby');
module.exports = exports['default'];
