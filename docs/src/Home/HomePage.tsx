/// <reference path="../docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
// import {Link} from 'react-router';
import IAppStore from '../IAppStore';
import {observer, inject} from 'mobx-react';

/**
 * Home page for app
 */

const HomePage = inject('appStore')(observer(
  ({appStore}: {appStore: IAppStore}) => (
    <div>
      <h1>HomePage</h1>
      <div>Page width: {appStore.layoutWidth}</div>
    </div>
  )
))

export default HomePage;
