'use strict';

exports.__esModule = true;

exports['default'] = function (linkList) {
  function build(list) {
    var l = undefined;
    var i = undefined;
    var html = [];

    // loop through files
    l = list.files.length;

    for (i = 0; i < l; i++) {
      var title = list.files[i].title;
      html.push('<li><a href="' + list.files[i].url + '" title="' + title + '">' + title + '</a></li>');
    }

    // loop through directories
    l = list.directories.length;

    for (i = 0; i < l; i++) {
      html.push('<ul>' + build(list.directories[i]) + '<ul>');
    }

    return html;
  }

  return build(linkList);
};

module.exports = exports['default'];
