export function repeat(str, times) {
  return new Array(times + 1).join(str);
}

export function osSplit(str) {
  if (str.split('\\').length !== 0) {
    return str.split('\\');
  }

  if (str.split('/').length !== 0) {
    return str.split('/');
  }

  return [];
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
