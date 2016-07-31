/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Application/Layout';
import NotFoundPage from '../NotFound/NotFoundPage';
import {IModule} from '../Home/IModule'
import {IAppStore} from '../AppStore'

function lazyLoadComponent(moduleBundle, props, getComponentFromModule) {
  return (location, cb) => {
    if (typeof window !== 'undefined') {
      moduleBundle(modulePromise => {
        modulePromise.default(props).then((module) => {
          cb(null, getComponentFromModule(module));
        });
      })
    } else {
      moduleBundle.default(props).then((module) => {
        cb(null, getComponentFromModule(module));
      });
    }
  }
}

const routes = (appStore: IAppStore) => (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute getComponent={lazyLoadComponent(require('bundle?lazy&name=list!../Home/index.ts'), appStore, (module: IModule) => module.HomePage)}/>
      <Route path="form" getComponent={lazyLoadComponent(require('bundle?lazy&name=list!../Home/index.ts'), appStore, (module: IModule) => module.FormPage)}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
