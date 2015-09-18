'use strict';

var path = require('path');

export default function (ctx) {
  var list = [],
    parse  = function (dir) {
      var i, l;

      // loop through files
      l = dir.files.length;

      for (i = 0; i < l; i++) {
        var replacePath = path.resolve(ctx.src) + path.sep;
        var dirPath     = path.resolve(dir.path);

        list.push({
          path: dir.path === ctx.src ? '' : dirPath.replace(replacePath, ''),
          fileName: path.basename(dir.files[i].fileName, ctx['file-type']),
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
}
