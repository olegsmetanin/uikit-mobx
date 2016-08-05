import {template} from 'lodash';

export interface I18n {
  (key: string, opts: Object): string;
}

export function i18n(_in: Object) {
  let cache = {};
  return function (key: string, opts: Object) {
    var res = null;
    if (cache[key]) {
      res = (cache[key](opts) as string);
    } else {
      cache[key] = template(_in[key]);
      res = (cache[key](opts) as string);
    }
    return res;
  }
}

export default i18n;