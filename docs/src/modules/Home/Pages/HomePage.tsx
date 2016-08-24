/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {IHomeState} from '../HomeAL/IHomeState'
import {IHomeActions} from '../HomeAL/IHomeActions'
import {IAppState} from '../../../Application/AppAL/IAppState'
import {ISystemActions} from '../../../Application/AppAL/System/ISystemActions'

/**
 * Home page for app
 */

const HomePage = ({
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
      <div> i18n app: {homeState.i18n('app:title', {title: 'Title', count: 2})}</div>
      <div> i18n mod: {homeState.i18n('module:title', {title: 'Title', count: 2})}</div>

      <button onClick={() => appState.user.permissions = {v: 2}}>permissions</button>
      <button onClick={() => systemActions.goto('/complex')}>goto</button>

      <button onClick={() => systemActions.setLang('de')}>de</button>
      <button onClick={() => systemActions.setLang('en')}>en</button>
      <div>{homeState.counter}</div>
      <button onClick={homeActions.incrementCounter}>increment</button>
      <button onClick={homeActions.decrementCounter}>decrement</button>
    </div>
)

export default HomePage;
