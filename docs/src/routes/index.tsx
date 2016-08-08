/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Application/Components/Layout';
import NotFoundPage from '../Application/Pages/NotFound/NotFoundPage';
import {IModule} from '../Modules/Home/IModule'

function lazyLoadComponent(moduleBundle, args, getComponentFromModule) {
  return (location, cb) => {
    if (typeof window !== 'undefined') {
      moduleBundle(modulePromise => {
        modulePromise.default(args).then((module) => {
          cb(null, getComponentFromModule(module));
        });
      })
    } else {
      moduleBundle.default(args).then((module) => {
        cb(null, getComponentFromModule(module));
      });
    }
  }
}

const routes = (args) => (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute getComponent={lazyLoadComponent(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IModule) => module.HomePage)}/>
      <Route path="list" getComponent={lazyLoadComponent(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IModule) => module.ListPage)}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
