/// <reference path="../../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {IAppStore} from '../../Application/IAppStore';
import {Store} from './Store';
import {Actions} from './Actions';
import {I18n} from '../../utils/i18n/i18n'

/**
 * Home page for app
 */

const HomePage = (
  {appStore, homeStore, homeActions, i18n}:
  {appStore: IAppStore, homeStore: Store, homeActions: Actions, i18n: I18n}
) => (
  <div>
    <h1>HomePage</h1>
    <div>Page width: {appStore.layoutWidth} i18n: {i18n('some:title', {title: 'Title'})}</div>
    <div>{homeStore.counter}</div>
    <button onClick={homeActions.incrementCounter}>increment</button>
    <button onClick={homeActions.decrementCounter}>decrement</button>
  </div>
)

export default HomePage;
