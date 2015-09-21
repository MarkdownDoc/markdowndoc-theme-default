'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function (ctx) {
  var list = [];
  var parse = function parse(dir) {
    var i = undefined;
    var l = undefined;

    // loop through files
    l = dir.files.length;

    for (i = 0; i < l; i++) {
      var replacePath = _path2['default'].resolve(ctx.src) + _path2['default'].sep;
      var dirPath = _path2['default'].resolve(dir.path);

      list.push({
        path: dir.path === ctx.src ? '' : dirPath.replace(replacePath, ''),
        fileName: _path2['default'].basename(dir.files[i].fileName, ctx['file-type']),
        html: dir.files[i].html,
        title: dir.files[i].title
      });
    }

    // loop through directories
    l = dir.directories.length;

    for (i = 0; i < l; i++) {
      parse(dir.directories[i]);
    }
  };

  parse(ctx.datatree);

  return list;
};

module.exports = exports['default'];
