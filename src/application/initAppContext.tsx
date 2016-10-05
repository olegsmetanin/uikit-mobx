import {HTTPClient} from 'generic'
import {AppState} from './AppAL/AppState'
import {UserService} from './AppAL/User/UserService'
import {UserActions} from './AppAL/User/UserActions'
import {SystemService} from './AppAL/System/SystemService'
import {SystemActions} from './AppAL/System/SystemActions'
import {hashHistory} from 'lib/Router'
import {EventBus} from 'application/eventBus/eventBus';

export function initAppContext(initState: any) {
  const eventBus = new EventBus()

  const httpClient = new HTTPClient()
  const history = hashHistory

  const appState = new AppState(initState)
  const userActions = new UserActions(appState, new UserService(httpClient))
  const systemActions = new SystemActions(appState, new SystemService(httpClient), history)

  return {
    eventBus,
    history,
    httpClient,
    appState,
    userActions,
    systemActions
  }
}



