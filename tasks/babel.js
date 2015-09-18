'use strict';
//babel config

module.exports = {
  options: {
    stage: 1,
    loose: ["all"],
    optional: ["runtime", "es7.asyncFunctions"]
  },
  dist: {
    options: {
      sourceMap: false
    },
    files: {
      "dist/index.js": "src/index.js",
      "dist/swig.js": "src/swig.js",
      "dist/create-file-list.js": "src/create-file-list.js",
    }
  }
};
