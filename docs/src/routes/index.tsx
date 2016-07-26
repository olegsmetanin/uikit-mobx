/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Layout/Layout';
import NotFoundPage from '../NotFound/NotFoundPage';

function lazyLoadComponent(lazyModule, component) {
  return (location, cb) => {
    lazyModule(module => {
      cb(null, module.default[component])
    })
  }
}

const routes = (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute getComponent={lazyLoadComponent(require('bundle?lazy&name=list!../Home/index.ts'), 'ConnectedHomePage')}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
