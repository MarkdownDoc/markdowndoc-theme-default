'use strict';
//mochacli config

module.exports = {
  options: {
    require: ['chai'],
    // reporter: 'nyan',
    bail: true
  },
  all: ['tests/**/*.test.js']
};
