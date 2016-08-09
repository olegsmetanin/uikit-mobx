/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {IAppState} from '../../AppAL/interfaces'
import {IUserActions} from '../../AppAL/User/interfaces'
import {ISystemActions} from '../../AppAL/System/interfaces'
import {Children} from 'react'

class IPreloaderProps {
  appState: IAppState;
  userActions: IUserActions;
  systemActions: ISystemActions;
}

class Preloader extends React.Component<IPreloaderProps, void> {

  componentDidMount() {
    this.load();
  }

  load = () => {
    let {appState, userActions, systemActions} = this.props;

    if (!appState.user) {
      userActions.getMe();
    }
    if (!appState.system) {
      systemActions.getSystem();
    }
  };

  render() {
    let {appState} = this.props;
    if (appState.userIsLoaded && appState.systemIsLoaded) {
      return Children.only(this.props.children)
    } else if (appState.userError/* || appState.systemError*/) {
      return (<div>
        <button onClick={this.load}>Reload</button>
      </div>)
    } else {
      return <div>App Loading...</div>
    }

  }
}

export default Preloader;
