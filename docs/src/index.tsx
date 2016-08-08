/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';

import HTTPClient from './utils/http/HTTPClient';
import routes from './routes';
import {AppState} from './Application/AppAL/AppState'
import {UserActions} from './Application/AppAL/User/UserActions'
import {UserService} from './Application/AppAL/User/UserService'
import {System} from './Application/AppAL/System/System'
require('./styles/docs.scss');

window['docs'] = (options: any) => {

  const {el, rootPath, state} = options;

  const httpClient = new HTTPClient();

  const appState = new AppState();
  const userActions = new UserActions(appState, new UserService(httpClient));

 // window.addEventListener("beforeunload", function (event) {
  //   var confirmationMessage = "\o/";
  //
  //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  //   return confirmationMessage;              // Gecko, WebKit, Chrome <34
  // });

  let run = async () => {

    if (!appState.user) {
      await userActions.getMe();
    }

    console.log('appState.user', appState.user);

    let appProps = {
      appState,
      userActions
    };

    render(
      <Provider {...appProps}>
        <Router children={routes(appProps)} history={browserHistory}/>
      </Provider>,
      el
    );

  };

  run();

};


