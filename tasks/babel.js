'use strict';
//babel config

module.exports = {
  dist: {
    options: {
      sourceMap: false,
      stage: 1,
      loose: ['all'],
      optional: ['runtime', 'es7.asyncFunctions']
    },
    files: {
      'dist/index.js': 'src/index.js',
      'dist/swig.js': 'src/swig.js',
      'dist/create-file-list.js': 'src/create-file-list.js',
    }
  },
  pre: {
    options: {
      sourceMap: true,
      modules: 'ignore'
    },
    files: {
      'pre/js/search.js': 'src/js/search.js',
      'pre/js/nav.js': 'src/js/nav.js',
    }
  }
};
