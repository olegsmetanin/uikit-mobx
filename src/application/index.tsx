/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {render} from 'react-dom'
import {reaction} from 'lib/Reactive'

import Application from './Application'
import {hashHistory} from 'lib/Router'
import HTTPClient from '../generic/api/http/HTTPClient'
import {AppState} from './AppAL/AppState'
import {UserService} from './AppAL/User/UserService'
import {UserActions} from './AppAL/User/UserActions'
import {SystemService} from './AppAL/System/SystemService'
import {SystemActions} from './AppAL/System/SystemActions'
import {Dialog} from './сomponents'

require('./styles/docs.scss')

window['docs'] = (options: any) => {

  const {el, initState} = options

  const history = hashHistory

  const httpClient = new HTTPClient()

  const appState = new AppState(initState)
  const userActions = new UserActions(appState, new UserService(httpClient))
  const systemActions = new SystemActions(appState, new SystemService(httpClient), history)

  history.listenBefore((location, callback) => {
    if (appState.isDirty) {
      systemActions.showDialog(
        <Dialog>
          {appState.i18n('app:leaveConfirmDialog')}
          <button onClick={() => {
            systemActions.hideDialog()
            systemActions.setDirty(false)
            callback()
          }}>
            OK
          </button>
          <button onClick={() => {
            systemActions.hideDialog()
            callback(false)
          }}>
            Cancel
          </button>
        </Dialog>
      )

    } else {
      callback()
    }
  })


  window.addEventListener('beforeunload', (e) => {
    if (appState.isDirty) {
      let dialogText = appState.i18n('app:leaveConfirmDialog')
      e.returnValue = dialogText
      return dialogText
    } else {
      return
    }
  })

  reaction(() => appState.system && appState.system.lang, lang => systemActions.loadLang(lang))

  const appStatesAndActions = {
    appState,
    userActions,
    systemActions,
    history,
    httpClient
  }

  render(<Application {...appStatesAndActions}/>, el)

}


