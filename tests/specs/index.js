'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _htmlMinifier = require('html-minifier');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _es6Promise = require('es6-promise');

var _es6Denodeify = require('es6-denodeify');

var _es6Denodeify2 = _interopRequireDefault(_es6Denodeify);

var _utils = require('./utils');

var _swig = require('./swig');

var _swig2 = _interopRequireDefault(_swig);

var _createFileList = require('./create-file-list');

var _createFileList2 = _interopRequireDefault(_createFileList);

var _createLinkList = require('./create-link-list');

var _createLinkList2 = _interopRequireDefault(_createLinkList);

var _buildLinkHtml = require('./build-link-html');

var _buildLinkHtml2 = _interopRequireDefault(_buildLinkHtml);

var denodeify = _es6Denodeify2['default'](_es6Promise.Promise);

var copy = denodeify(_fsExtra2['default'].copy);
var renderFile = _swig2['default'].renderFile;
var writeFile = _fsExtra2['default'].outputFile;

function getRenderPathForPage(file, dest) {
  var sep = _path2['default'].sep;
  var d = dest + sep;

  return d + file.path + sep + file.fileName + '.html';
}

function renderSinglePage(template, data) {
  var html = renderFile(template, data);

  return _htmlMinifier.minify(html, { collapseWhitespace: true });
}

function render(list, template, ctx) {
  for (var i = list.length - 1; i >= 0; i--) {
    var backslashes = list[i].path !== '' ? _utils.repeat('..' + _path2['default'].sep, _utils.osSplit(list[i].path).length) : '';
    var linkList = _createLinkList2['default'](ctx, backslashes);

    ctx.html = list[i].html;
    ctx.title = list[i].title;
    ctx.linkbuilder = _buildLinkHtml2['default'](linkList);
    ctx.assetsPath = backslashes;

    delete ctx.datatree;

    var pagePath = getRenderPathForPage(list[i], ctx.destAbsolute);
    var html = renderSinglePage(template, ctx);

    writeFile(pagePath, html);
  }
}

exports['default'] = function (dest, ctx) {
  var template = _path2['default'].resolve(__dirname, '../src/views/index.html.swig');

  if (!('view' in ctx)) {
    ctx.view = {};
  }

  // Extend default `view.json` with `ctx.view` object
  ctx.view = _extend2['default'](require('./../view.json'), ctx.view);

  var list = _createFileList2['default'](ctx);

  var renderHtml = denodeify(render);

  return _es6Promise.Promise.all([renderHtml(list, template, ctx), copy(_path2['default'].resolve(__dirname, '../assets'), _path2['default'].resolve(ctx.destAbsolute, 'assets'))]);
};

module.exports = exports['default'];
