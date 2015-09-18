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

var _swig = require('./swig');

var _swig2 = _interopRequireDefault(_swig);

var _createFileList = require('./create-file-list');

var _createFileList2 = _interopRequireDefault(_createFileList);

// const copy       = fse.copy;
var renderFile = _swig2['default'].renderFile;
var writeFile = _fsExtra2['default'].outputFile;

function getRenderPathForPage(file, dest) {
  var sep = _path2['default'].sep;
  dest = dest + sep;

  return dest + file.path + sep + file.fileName + '.html';
}

function renderSinglePage(data, template) {
  var html = renderFile(template, { html: data.html, title: data.title });

  return _htmlMinifier.minify(html, { collapseWhitespace: true });
}

function render(list, template, ctx) {
  for (var i = list.length - 1; i >= 0; i--) {
    var pagePath = getRenderPathForPage(list[i], ctx.destAbsolute);
    var html = renderSinglePage(list[i], template);

    writeFile(pagePath, html);
  }
}

exports['default'] = function (dest, ctx) {
  var template = _path2['default'].resolve(__dirname, '../views/index.html.swig');

  if (!('view' in ctx)) {
    ctx.view = {};
  }

  // Extend default `view.json` with `ctx.view` object
  ctx.view = _extend2['default'](require('./../view.json'), ctx.view);

  var list = _createFileList2['default'](ctx);

  delete ctx.datatree;

  // copy(
  //   path.resolve(__dirname, '../assets'),
  //   path.resolve(ctx.destAbsolute, 'assets')
  // );

  render(list, template, ctx);
};

module.exports = exports['default'];
