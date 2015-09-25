'use strict';

exports.__esModule = true;
exports.repeat = repeat;
exports.osSplit = osSplit;
exports.capitalizeFirstLetter = capitalizeFirstLetter;

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
