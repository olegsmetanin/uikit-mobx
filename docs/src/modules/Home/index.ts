import {reaction, observer, inject} from 'lib/Reactive'

import {IAppState} from '../../Application/AppAL/IAppState'
import {IUserActions} from '../../Application/AppAL/User/IUserActions'
import {ISystemActions} from '../../Application/AppAL/System/ISystemActions'
import {IUIActions} from '../../Application/AppAL/UI/IUIActions'

import {IHomeModule} from './IHomeModule'
import {HomeState} from './HomeAL/HomeState'
import {HomeService} from './HomeAL/HomeService'
import {HomeActions} from './HomeAL/HomeActions'

import HomePage from './Pages/HomePage'
import ListPage from './Pages/ListPage'
import ComplexFormPage from './Pages/ComplexFormPage'
import {SomeDocActions} from './SomeDoc/SomeDocActions'
import {SomeDocState} from './SomeDoc/SomeDocState'
// import {IHTTPClient} from 'components'
import {SomeDocFormPage} from './SomeDoc/SomeDocFormPage'
import {SomeDocFakeService} from './SomeDoc/SomeDocFakeService'
import {withRouter} from 'lib/Router'

// singleton )
let module: IHomeModule = null

const init = async ({
    appState,
    userActions,
    systemActions,
    uiActions,
    // httpClient
  }: {
    appState: IAppState,
    userActions: IUserActions,
    systemActions: ISystemActions,
    uiActions: IUIActions,
    // httpClient: IHTTPClient
  }) => {

  if (module) {
    return module
  }

  const service = new HomeService()
  let homeState = new HomeState()
  const homeActions = new HomeActions({state: homeState, service: service})

  await homeActions.loadLang(
    appState.system.lang,
    () => appState.i18n
  )

  const someDocState = new SomeDocState()
  const someDocActions = new SomeDocActions(someDocState, new SomeDocFakeService())

  reaction(
    () => appState.system && appState.system.lang,
    lang => homeActions.loadLang(lang, () => appState.i18n)
  )

  let statesAndActions = {
    appState,
    systemActions,
    uiActions,
    userActions,
    homeState,
    homeActions,
    someDocState,
    someDocActions
  }
  const ConnectedHomePage = inject(() => (
    statesAndActions
  ))(observer(HomePage))

  const ConnectedListPage = inject(() => (
    statesAndActions
  ))(observer(ListPage))

  const ConnectedComplexFormPage = inject(() => (
    statesAndActions
  ))(observer(ComplexFormPage))

  const ConnectedSomeDocFormPage = inject((allStores, nextProps) =>
    Object.assign({}, statesAndActions, nextProps)
  )(withRouter(observer(SomeDocFormPage)))

  module = {
    HomePage: ConnectedHomePage,
    ListPage: ConnectedListPage,
    ComplexFormPage: ConnectedComplexFormPage,
    SomeDocFormPage: ConnectedSomeDocFormPage
  }

  return module

}

export default init

