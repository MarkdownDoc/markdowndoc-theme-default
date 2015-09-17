module.exports = function (data) {
  var list = [],
    parse = function(dir) {
      var i, l;

      // loop through files
      l = dir.files.length;

      for (i = 0; i < l; i++) {
        list.push({
          fileName: path.basename(dir.files[i].fileName, '.md'),
          html: dir.files[i].html,
          title: dir.files[i].title,
        });
      }

      // loop through directories
      l = dir.directories.length;

      for (i = 0; i < l; i++) {
        parse(dir.directories[i]);
      }
    };

  parse(data);

  return list;
};
