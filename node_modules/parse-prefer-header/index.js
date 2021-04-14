'use strict';

const camelCase = require('lodash.camelcase');

function parsePreference(result, preference) {
  let start = 0;
  let quote = false;
  let baseToken = null;
  for (var i = 0; i <= preference.length; ++i) {
    const char = i < preference.length ? preference[i] : ';';
    if (char === '"') {
      quote = !quote;
    } else if (char === ';' && !quote) {
      const segment = preference.slice(start, i);
      const index = segment.indexOf('=');
      let token = '', value = '';
      if (index < 0) {
        token = segment.trim().toLowerCase();
      } else {
        token = segment.slice(0, index).trim().toLowerCase();
        value = segment.slice(index + 1).trim();
        if (value[0] === '"' && value[value.length - 1] === '"') {
          value = value.slice(1, -1);
        }
      }
      if (baseToken == null) {
        baseToken = token;
      } else {
        token = baseToken + '-' + token;
      }
      const key = camelCase(token);
      if (result[key] == null) {
        result[key] = value.length ? value : true;
      }
      start = i + 1;
    }
  }
}

function parsePreferHeader(prefer) {
  const result = {};

  if (Array.isArray(prefer)) {
    prefer = prefer.join(',');
  }

  if (!prefer) {
    return result;
  }

  let start = 0;
  let quote = false;
  for (var i = 0; i <= prefer.length; ++i) {
    const char = i < prefer.length ? prefer[i] : ',';
    if (char === '"') {
      quote = !quote;
    } else if (char === ',' && !quote) {
      const preference = prefer.slice(start, i);
      parsePreference(result, preference);
      start = i + 1;
    }
  }

  return result;
}

module.exports = parsePreferHeader;
