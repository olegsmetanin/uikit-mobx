/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';

import HTTPClient from './utils/http/HTTPClient';
import routes from './routes';
import {AppStore} from './AppStore';
require('./styles/docs.scss');

window['docs'] = (options: any) => {

  const {el, rootPath, state} = options;

  const httpClient = new HTTPClient();

  const appStore = new AppStore({rootPath, httpClient});

  render(
    <Provider appStore={appStore}>
        <Router children={routes(appStore)} history={browserHistory}/>
    </Provider>,
    el
  );
};


