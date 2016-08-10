/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import { render } from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';
import {Provider, observer} from 'mobx-react';

import HTTPClient from './utils/http/HTTPClient';
import routes from './routes';
import {AppState} from './Application/AppAL/AppState'
import {UserActions} from './Application/AppAL/User/UserActions'
import {UserService} from './Application/AppAL/User/UserService'
import {SystemService} from './Application/AppAL/System/SystemService'
import {SystemActions} from './Application/AppAL/System/SystemActions'
import Preloader from './Application/Components/Preloader'
import delay from './utils/Promise/delay'
import {loadI18n} from './utils/i18n/loadI18n'
import {reaction, action} from 'mobx'
require('./styles/docs.scss');

window['docs'] = (options: any) => {

  const {el, initState} = options;

  const httpClient = new HTTPClient();

  const appState = new AppState();
  const userActions = new UserActions(appState, new UserService(httpClient));
  const systemActions = new SystemActions(appState, new SystemService(httpClient));

  //const sysLang = initState['lang'];
 // window.addEventListener("beforeunload", function (event) {
  //   var confirmationMessage = "\o/";
  //
  //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  //   return confirmationMessage;              // Gecko, WebKit, Chrome <34
  // });

  reaction(() => appState.system && appState.system.lang, lang => systemActions.loadLang(lang))

  const run = async () => {

    // await userActions.getMe();
    // await systemActions.getSystem();

    // const lang = ['en', 'de'].indexOf(appState.user.lang) !== -1 ? appState.user.lang : 'en';
    // let i18n = await loadI18n(require(`bundle?lazy!./Applicaton/i18n/i18n.${lang}.json`));

    //await delay({}, 1000);

    let appProps = {
      appState,
      userActions,
      systemActions,
    };

    render(
      <Preloader {...appProps}>
        <Provider {...appProps}>
          <Router children={routes(appProps)} history={hashHistory}/>
        </Provider>
      </Preloader>,
      el
    );

  };

  run();

};


