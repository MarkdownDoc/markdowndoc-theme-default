'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function (ctx, backslashes) {
  function build(tree) {
    var i = undefined;
    var l = undefined;

    l = tree.files.length;

    for (i = 0; i < l; i++) {
      var replacePath = _path2['default'].resolve(ctx.src) + _path2['default'].sep;
      var dirPath = _path2['default'].resolve(tree.path);
      var linkpath = tree.path === ctx.src ? '' : dirPath.replace(replacePath, '');

      var subpath = linkpath !== '' ? linkpath + _path2['default'].sep : '';

      var _name = _path2['default'].basename(tree.files[i].fileName, ctx['file-type']);

      delete tree.files[i].html;
      delete tree.files[i].fileName;

      tree.menu = tree.path === ctx.src ? 'Home' : _path2['default'].basename(tree.path);
      tree.files[i].url = backslashes + subpath + _name + '.html';
      tree.files[i].title = _name;
    }

    // loop through directories
    l = tree.directories.length;

    for (i = 0; i < l; i++) {
      tree.directories[i] = build(tree.directories[i]);
    }

    return tree;
  }

  return build(ctx.datatree);
};

module.exports = exports['default'];
