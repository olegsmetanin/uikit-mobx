/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Application/Layout';
import NotFoundPage from '../Application/NotFound/NotFoundPage';
import {IModule} from '../Modules/Home/IModule'
import {IAppStore} from '../Application/IAppStore'

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
      <IndexRoute getComponent={lazyLoadComponent(require('bundle?lazy&name=home!../Modules/Home/index.ts'), appStore, (module: IModule) => module.HomePage)}/>
      <Route path="list" getComponent={lazyLoadComponent(require('bundle?lazy&name=home!../Modules/Home/index.ts'), appStore, (module: IModule) => module.ListPage)}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
