'use strict';
//babel config

module.exports = {
  options: {
    stage: 1,
    loose: ["all"],
    optional: ["runtime", "es7.asyncFunctions"]
  },
  test: {
    files: {
      "tests/specs/cli.js": "src/cli.js",
      "tests/specs/environment.js": "src/environment.js",
      "tests/specs/errors.js": "src/errors.js",
      "tests/specs/exclude.js": "src/exclude.js",
      "tests/specs/markdowndoc.js": "src/markdowndoc.js",
      "tests/specs/notifier.js": "src/notifier.js",
      "tests/specs/parser.js": "src/parser.js",
      "tests/specs/utils.js": "src/utils.js",
    }
  },
  theme: {
    files: {
      "dist/theme-default/index.js": "src/theme-default/index.js",
      "dist/theme-default/swig.js": "src/theme-default/swig.js",
    }
  },
  dist: {
    options: {
      sourceMap: true
    },
    files: {
      "dist/cli.js": "src/cli.js",
      "dist/environment.js": "src/environment.js",
      "dist/errors.js": "src/errors.js",
      "dist/exclude.js": "src/exclude.js",
      "dist/markdowndoc.js": "src/markdowndoc.js",
      "dist/notifier.js": "src/notifier.js",
      "dist/parser.js": "src/parser.js",
      "dist/utils.js": "src/utils.js",
    }
  }
};
