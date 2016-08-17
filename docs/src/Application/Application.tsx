/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */
import {hashHistory, Router} from 'lib/Router'
import {Provider, observer, reaction} from 'lib/Reactive'

import routes from '../routes/index'

import HTTPClient from '../utils/http/HTTPClient'
import {IAppState, AppState} from './AppAL'
import {IUserActions, UserActions, UserService} from './AppAL/User'
import {ISystemActions, SystemActions, SystemService} from './AppAL/System'

export class Application extends React.Component<void, void> {

  appProps: {
    appState: IAppState;
    userActions: IUserActions;
    systemActions: ISystemActions;
  }

  history: any;

  counter: number = 0;

  constructor(props, context) {
    super(props, context);

    this.history = hashHistory;

    const httpClient = new HTTPClient();

    const appState = new AppState();
    const userActions = new UserActions(appState, new UserService(httpClient));
    const systemActions = new SystemActions(appState, new SystemService(httpClient), this.history);



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
          <Router key={this.counter} history={this.history}>
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
