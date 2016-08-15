/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {hashHistory} from 'react-router'
import {Router} from 'react-router'
import {reaction} from 'mobx'
import {Provider, observer} from 'mobx-react'

import routes from '../routes/index'

import HTTPClient from '../utils/http/HTTPClient'
import {IAppState} from './AppAL/interfaces'
import {AppState} from './AppAL/AppState'
import {UserService} from './AppAL/User/UserService'
import {IUserActions} from './AppAL/User/interfaces'
import {UserActions} from './AppAL/User/UserActions'
import {SystemService} from './AppAL/System/SystemService'
import {ISystemActions} from './AppAL/System/interfaces'
import {SystemActions} from './AppAL/System/SystemActions'

export class Application extends React.Component<void, void> {

  appProps: {
    appState: IAppState;
    userActions: IUserActions;
    systemActions: ISystemActions;
  }

  counter: number = 0;

  constructor(props, context) {
    super(props, context);

    const httpClient = new HTTPClient();

    const appState = new AppState();
    const userActions = new UserActions(appState, new UserService(httpClient));
    const systemActions = new SystemActions(appState, new SystemService(httpClient));

    this.appProps = {
      appState,
      userActions,
      systemActions
    }

  }

  componentDidMount() {

    const {appState, systemActions} = this.appProps;

    reaction(() => appState.system && appState.system.lang, lang => systemActions.loadLang(lang))

    reaction(() => appState.user && appState.user.permissions, () => this.forceUpdate())

    this.load();

  }

  load = () => {
    const {appState, userActions, systemActions} = this.appProps;

    if (!appState.user) {
      userActions.getMe();
    }
    if (!appState.system) {
      systemActions.getSystem();
    }
  };

  render() {

    const {appState} = this.appProps;

    if (appState.userIsLoaded && appState.systemIsLoaded) {
      this.counter += 1;
      return (
        <Provider {...this.appProps}>
          <Router key={this.counter} history={hashHistory}>
            {routes(this.appProps)}
          </Router>
        </Provider>
      )
    } else if (appState.userError/* || appState.systemError*/) {
      return (
        <div>
          <button onClick={this.load}>Reload</button>
        </div>)
    } else {
      return <div>App Loading...</div>
    }
  }
}

const ConnectedApplication = observer(Application);

export default ConnectedApplication;
