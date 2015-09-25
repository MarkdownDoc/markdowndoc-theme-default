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
      'dist/create-link-list.js': 'src/create-link-list.js',
      'dist/utils.js': 'src/utils.js',
      'dist/build-link-html.js': 'src/build-link-html.js',
    }
  },
  test: {
    options: {
      sourceMap: false,
      stage: 1,
      loose: ['all'],
      optional: ['runtime', 'es7.asyncFunctions']
    },
    files: {
      'tests/specs/index.js': 'src/index.js',
      'tests/specs/swig.js': 'src/swig.js',
      'tests/specs/create-file-list.js': 'src/create-file-list.js',
      'tests/specs/create-link-list.js': 'src/create-link-list.js',
      'tests/specs/utils.js': 'src/utils.js',
      'tests/specs/build-link-html.js': 'src/build-link-html.js',
    }
  },
  pre: {
    options: {
      sourceMap: false,
      modules: 'ignore'
    },
    files: {
      'pre/js/search.js': 'src/js/search.js',
      'pre/js/nav.js': 'src/js/nav.js',
    }
  }
};
