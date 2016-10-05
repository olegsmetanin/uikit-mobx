/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {render} from 'react-dom'
import {reaction} from 'lib/Reactive'

import Application from './Application'

import {Dialog} from './сomponents'
import {initAppContext} from './initAppContext';

require('./styles/docs.scss')

window['docs'] = (options: any) => {

  const {el, initState} = options

  const appContext = initAppContext(initState)

  let {appState, systemActions, history} = appContext

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

  render(<Application {...appContext}/>, el)

}


