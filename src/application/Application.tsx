import * as React from 'react'
import {Router} from 'lib/Router'
import {Provider, observer, reaction} from 'lib/Reactive'

import routes from './routes/index'

import {IAppState} from './AppAL/IAppState'
import {IUserActions} from './AppAL/User/IUserActions'
import {ISystemActions} from './AppAL/System/ISystemActions'

export interface IApplicationProps {
  appState: IAppState
  userActions: IUserActions
  systemActions: ISystemActions
  history: any
}

export class Application extends React.Component<IApplicationProps, void> {

  counter: number = 0

  componentDidMount() {

    const {appState} = this.props

    reaction(() => appState.user && appState.user.permissions, () => this.forceUpdate())

    this.load()

  }

  load = () => {
    const {appState, userActions, systemActions} = this.props

    if (!appState.user) {
      userActions.getMe()
    }
    if (!appState.system) {
      systemActions.getSystem()
    }
  }

  render() {

    const {appState} = this.props

    if (appState.userIsLoaded && appState.systemIsLoaded) {
      // important for forceUpdate in reaction
      this.counter += 1
      return (
        <Provider {...this.props}>
          <Router key={this.counter} history={this.props.history}>
            {routes(this.props)}
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

const ConnectedApplication = observer(Application)

export default ConnectedApplication
