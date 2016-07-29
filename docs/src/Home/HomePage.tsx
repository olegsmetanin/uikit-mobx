/// <reference path="../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {Link} from 'react-router';
import IAppStore from '../IAppStore';
import {IStore} from './Store';

/**
 * Home page for app
 */

const HomePage = (
  {appStore, homeStore}:
  {appStore: IAppStore, homeStore: IStore}
) => (
  <div>
    <h1>HomePage</h1>
    <div>Page width: {appStore.layoutWidth}</div>

    <div>
      <Link to="form">Form</Link>
    </div>

    <div>{homeStore.counter}</div>
    <button onClick={homeStore.increment}>increment</button>
    <button onClick={homeStore.decrement}>decrement</button>
  </div>
)

export default HomePage;
