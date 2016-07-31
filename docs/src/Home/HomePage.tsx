/// <reference path="../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {Link} from 'react-router';
import {IAppStore} from '../AppStore';
import {IStore} from './Store';
import {IActions} from './Actions';

/**
 * Home page for app
 */

const HomePage = (
  {appStore, homeStore, homeActions}:
  {appStore: IAppStore, homeStore: IStore, homeActions: IActions}
) => (
  <div>
    <h1>HomePage</h1>
    <div>Page width: {appStore.layoutWidth}</div>

    <div>{homeStore.counter}</div>
    <button onClick={homeActions.incrementCounter}>increment</button>
    <button onClick={homeActions.decrementCounter}>decrement</button>
  </div>
)

export default HomePage;
