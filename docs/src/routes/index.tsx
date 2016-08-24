/// <reference path="../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'lib/Router'

import {IAppState} from '../Application/AppAL/IAppState'
import {IUserActions} from '../Application/AppAL/User/IUserActions'
import {ISystemActions} from '../Application/AppAL/System/ISystemActions'
import {IHomeModule} from '../Modules/Home/IHomeModule'

import {Layout} from '../Application/Components'
import {loadPage} from '../Application/Components/PageLoader'
import NotFoundPage from '../Application/Pages/NotFound'

const routes = (args: {
  appState: IAppState,
  userActions: IUserActions,
  systemActions: ISystemActions
}) => {
  let permissions = args.appState.user.permissions
  return (
    <Route>
      <Route path="/" component={Layout}>
        <IndexRoute
          getComponent={loadPage(require('bundle?lazy&name=home!../modules/Home/index.ts'), args, (module: IHomeModule) => module.HomePage)}/>
        <Route path="list"
               getComponent={loadPage(require('bundle?lazy&name=home!../modules/Home/index.ts'), args, (module: IHomeModule) => module.ListPage)}/>
        <Route path="somedoc/:id"
               getComponent={loadPage(require('bundle?lazy&name=home!../modules/Home/index.ts'), args, (module: IHomeModule) => module.SomeDocFormPage)}/>
        {permissions.v === 1 && (
          <Route path="complex"
               getComponent={loadPage(require('bundle?lazy&name=home!../modules/Home/index.ts'), args, (module: IHomeModule) => module.ComplexFormPage)}/>
        )}
      </Route>

      <Route path="*" component={NotFoundPage} onEnter={() => {args.systemActions.goto('/')}}/>
    </Route>
  )
}

export default routes
