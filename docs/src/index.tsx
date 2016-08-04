/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';

import HTTPClient from './utils/http/HTTPClient';
import routes from './routes';
import {AppStore} from './Application/AppStore';
require('./styles/docs.scss');

window['docs'] = (options: any) => {

  const {el, rootPath, state} = options;

  const httpClient = new HTTPClient();

  const appStore = new AppStore({rootPath, httpClient});

  // window.addEventListener("beforeunload", function (event) {
  //   var confirmationMessage = "\o/";
  //
  //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  //   return confirmationMessage;              // Gecko, WebKit, Chrome <34
  // });


  render(
    <Provider appStore={appStore}>
        <Router children={routes(appStore)} history={browserHistory}/>
    </Provider>,
    el
  );
};


