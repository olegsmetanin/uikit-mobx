/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {IHomeState} from '../HomeAL/IHomeState'
import {IHomeActions} from '../HomeAL/IHomeActions'
import {IAppState} from 'application/AppAL/IAppState'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'

/**
 * Home page for app
 */

export const HomePage = ({
    appState,
    systemActions,
    homeState,
    homeActions
  }: {
    appState: IAppState,
    systemActions: ISystemActions,
    homeState: IHomeState,
    homeActions: IHomeActions
  }) => (
    <div>
      <h1>Page</h1>
      <div>Page width: {appState.layoutWidth}</div>
      <div> i18n app: {appState.i18n('app:title', {title: 'Title', count: 2})}</div>
      <div> i18n mod: {appState.i18n('module:title', {title: 'Title', count: 2})}</div>

      <button onClick={() => systemActions.goto('/order/0')}>goto /order/0</button>

      <div>{homeState.counter}</div>
      <button onClick={homeActions.incrementCounter}>increment</button>
      <button onClick={homeActions.decrementCounter}>decrement</button>
    </div>
)
