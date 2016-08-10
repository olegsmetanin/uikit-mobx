import {template} from 'lodash';

export interface I18n {
  (key: string, opts?: Object): string;
}

export function loadI18n(bundleLoader): Promise<I18n> {

  return new Promise((resolve, reject) => {
    bundleLoader(dict => {

      let cache = Object.keys(dict).reduce((accu, key) => {
        let val = dict[key];
        accu[key] = val.indexOf('${') === -1 ? val : template(val);
        return accu;
      }, {});

      function i18n(key: string, opts?: Object) {
        if (cache[key]) {
          if (opts) {
            return cache[key](opts) as string;
          } else {
            return cache[key] as string;
          }
        }
      }

      resolve(i18n);
    })
  })
}

export default loadI18n;