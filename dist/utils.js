'use strict';

exports.__esModule = true;
exports.repeat = repeat;
exports.osSplit = osSplit;

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function osSplit(str) {
  if (str.split('\\').length !== 0) {
    return str.split('\\');
  }

  if (str.split('/').length !== 0) {
    return str.split('/');
  }

  return [];
}
