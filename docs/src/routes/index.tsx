/// <reference path="../docs.d.ts" />
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'react-router';

import Layout from '../Application/Components/Layout';
import NotFoundPage from '../Application/Pages/NotFound/NotFoundPage';
import {IHomeModule} from '../Modules/Home/IHomeModule'
import {loadPage} from '../Application/Components/PageLoader'
import {IAppState} from '../Application/AppAL/interfaces'
import {IUserActions} from '../Application/AppAL/User/interfaces'
import {ISystemActions} from '../Application/AppAL/System/interfaces'

const routes = (args: {appState: IAppState, userActions: IUserActions, systemActions: ISystemActions}) => {
  let permissions = args.appState.user.permissions;
  return (
    <Route>
      <Route path="/" component={Layout}>
        <IndexRoute
          getComponent={loadPage(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IHomeModule) => module.HomePage)}/>
        <Route path="list"
               getComponent={loadPage(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IHomeModule) => module.ListPage)}/>
        {permissions.v === 1 && (
          <Route path="complex"
               getComponent={loadPage(require('bundle?lazy&name=home!../Modules/Home/index.ts'), args, (module: IHomeModule) => module.ComplexFormPage)}/>
        )}
      </Route>

      <Route path="*" component={NotFoundPage}/>
    </Route>
  )
};

export default routes;
