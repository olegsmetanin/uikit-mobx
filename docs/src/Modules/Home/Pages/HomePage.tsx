/// <reference path="../../../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {IHomeState, IHomeActions} from '../HomeAL/interfaces';
import {I18n} from '../../../utils/i18n/loadI18n'
import {IAppState} from '../../../Application/AppAL/interfaces'
import {ISystemActions} from '../../../Application/AppAL/System/interfaces'

/**
 * Home page for app
 */

const HomePage = (
  {appState, systemActions, homeState, homeActions}:
  {appState: IAppState, systemActions: ISystemActions, homeState: IHomeState, homeActions: IHomeActions}
) => (
  <div>
    <h1>Page</h1>
    <div>Page width: {appState.layoutWidth}</div>
    <div> i18n app: {appState.i18n('some:title', {title: 'Title', count: 2})}</div>
    <div> i18n mod: {homeState.i18n('some:title', {title: 'Title', count: 2})}</div>

    <button onClick={() => systemActions.setLang('de')}>de</button>
    <button onClick={() => systemActions.setLang('en')}>en</button>
    <div>{homeState.counter}</div>
    <button onClick={homeActions.incrementCounter}>increment</button>
    <button onClick={homeActions.decrementCounter}>decrement</button>
  </div>
)

export default HomePage;