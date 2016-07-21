/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Layout/Layout';
import HomePage from '../Home/HomePage';
import NotFoundPage from '../NotFound/NotFoundPage';


const routes = (
  <Route>
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
