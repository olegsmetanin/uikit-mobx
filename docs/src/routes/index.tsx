/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Application/Components/Layout';
import NotFoundPage from '../Application/Pages/NotFound/NotFoundPage';
import {IModule} from '../Modules/Home/IModule'
import pageLoader from '../Application/Components/Pageloader/Pageloader'

const routes = (args) => (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute component={pageLoader(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IModule) => module.HomePage)}/>
      <Route path="list" component={pageLoader(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IModule) => module.ListPage)}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
