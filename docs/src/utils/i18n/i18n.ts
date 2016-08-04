import {template} from 'lodash';

export function i18n(_in: Object) {
  let cache = {};
  return function (key, args) {
    var res = null;
    if (cache[key]) {
      res = (cache[key](args) as string);
    } else {
      cache[key] = template(_in[key]);
      res = (cache[key](args) as string);
    }
    return res;
  }
}

export default i18n;