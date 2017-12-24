/**
 * Created by lwch on 2017/7/29.
 */
const queryString = require('query-string');

export const isNull = (value) => {
  const isEmpty = typeof value === 'string' && value === '';
  const isNaN = typeof value === 'number' && Number.isNaN(value);
  return value === null || value === undefined || isEmpty || isNaN;
};

export const isNotNull = value => !isNull(value);

export const assign = Object.assign || function(target, ...sources) {
  sources.forEach((source) => {
    const keys = Object.keys(source);
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    });
  });
  return target;
};

export const find = (array, callback) => {
  let val = null;
  if (isNull(array)) {
    return val;
  }
  for (let i = 0; i < array.length; i += 1) {
    if (callback(array[i])) {
      val = array[i];
      return val;
    }
  }
  return val;
};

export const findIndex = (array, callback) => {
  let val = -1;
  if (isNull(array)) {
    return val;
  }
  for (let i = 0; i < array.length; i += 1) {
    if (callback(array[i])) {
      val = i;
      return val;
    }
  }
  return val;
};

export const addQueryParam = function (url, paramObj) {
  const urlQuery = url.indexOf('?') > -1 ? queryString.parse(url, { arrayFormat: 'index' }) : {};
  const objQuery = typeof paramObj === 'string' ? queryString.parse(paramObj, { arrayFormat: 'index' }) : paramObj;
  const query = assign(urlQuery, objQuery);
  const qString = queryString.stringify(query);
  const seq = qString.length > 0 ? '?' : '';
  return `${url.split('?')[0]}${seq}${qString}`;
};