/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {render} from 'react-dom'
import {reaction} from './lib/Reactive'

import Application from './Application/Application'
import {hashHistory} from './lib/Router'
import HTTPClient from './utils/http/HTTPClient'
import {AppState} from './Application/AppAL/AppState'
import {UserService} from './Application/AppAL/User/UserService'
import {UserActions} from './Application/AppAL/User/UserActions'
import {SystemService} from './Application/AppAL/System/SystemService'
import {SystemActions} from './Application/AppAL/System/SystemActions'
import {UIActions} from './Application/AppAL/UI/UIActions'

require('./styles/docs.scss');

window['docs'] = (options: any) => {

  const {el, initState} = options

  const history = hashHistory;

  const httpClient = new HTTPClient()

  const appState = new AppState(initState)
  const userActions = new UserActions(appState, new UserService(httpClient))
  const systemActions = new SystemActions(appState, new SystemService(httpClient), history)
  const uiActions = new UIActions(appState)

  reaction(() => appState.system && appState.system.lang, lang => systemActions.loadLang(lang))

  const appStatesAndActions = {
    appState,
    userActions,
    systemActions,
    uiActions,
    history
  }

  render(<Application {...appStatesAndActions}/>, el)

};


