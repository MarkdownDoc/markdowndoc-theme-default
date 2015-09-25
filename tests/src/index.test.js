'use strict';

var theme  = require('../specs/index');
var utils  = require('../specs/utils');
var assert = require('chai').assert;
var expect = require('chai').expect;
var path   = require('path');

describe('#default', function() {
  it('repeat a string on multiplikator', function () {
    expect(utils.repeat('../', 2)).to.equal('../../');
  });
});
