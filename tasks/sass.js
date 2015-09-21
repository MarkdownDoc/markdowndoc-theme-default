'use strict';
//clean config

module.exports = {
  dev: {
    options: {
      sourceMap: false,
      includePaths: [
        './node_modules/foundation-sites/scss/',
        './node_modules/sass-material-colors/sass/'
      ],
      bundleExec: true,
      outputStyle: 'compressed'
    },
    files: {
      'assets/css/main.css': 'src/scss/main.scss'
    }
  }
};
