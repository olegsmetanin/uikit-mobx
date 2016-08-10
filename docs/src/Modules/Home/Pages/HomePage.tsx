/// <reference path="../../../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {IHomeState, IHomeActions} from '../HomeAL/interfaces';
import {I18n} from '../../../utils/i18n/loadI18n'
import {IAppState} from '../../../Application/AppAL/interfaces'

/**
 * Home page for app
 */

const HomePage = (
  {appState, homeState, homeActions, i18n}:
  {appState: IAppState, homeState: IHomeState, homeActions: IHomeActions, i18n: I18n}
) => (
  <div>
    <h1>Page</h1>
    <div>Page width: {appState.layoutWidth} i18n: {i18n('some:title', {title: 'Title', count: 2})}</div>
    <div>{homeState.counter}</div>
    <button onClick={homeActions.incrementCounter}>increment</button>
    <button onClick={homeActions.decrementCounter}>decrement</button>
  </div>
)

export default HomePage;
