import {reaction, observer, inject} from 'lib/Reactive'

import {IAppState} from '../../AppAL/IAppState'
import {IUserActions} from '../../AppAL/User/IUserActions'
import {ISystemActions} from '../../AppAL/System/ISystemActions'

import {IHomeModule} from './IHomeModule'
import {HomeState} from './HomeAL/HomeState'
import {HomeService} from './HomeAL/HomeService'
import {HomeActions} from './HomeAL/HomeActions'

import HomePage from './pages/HomePage'
import {withRouter} from 'lib/Router'
import {OrderViewPage} from 'domain/Order/View/OrderViewPage'
import {OrderMockService} from 'domain/Order/OrderMockService'
import {CustomerMockService} from 'domain/Customer/CustomerMockService'

import {ConfirmDialog} from 'application/сomponents'
import {OrderListViewPage} from 'domain/Order/List/OrderListViewPage';

// singleton )
let module: IHomeModule = null

const register = async ({
    appState,
    userActions,
    systemActions,
    // httpClient
  }: {
    appState: IAppState,
    userActions: IUserActions,
    systemActions: ISystemActions,
    // httpClient: IHTTPClient
  }) => {

  if (module) {
    return module
  }

  const homeService = new HomeService()
  const homeState = new HomeState()
  const homeActions = new HomeActions({state: homeState, service: homeService})

  await homeActions.loadLang(
    appState.system.lang,
    () => appState.i18n
  )

  reaction(
    () => appState.system && appState.system.lang,
    lang => homeActions.loadLang(lang, () => appState.i18n)
  )

  let statesAndActions = {
    appState,
    systemActions,
    userActions,
    homeState,
    homeActions,
  }
  const ConnectedHomePage = inject(() => (
    statesAndActions
  ))(observer(HomePage))

  const orderService = new OrderMockService('/')
  const customerService = new CustomerMockService('/')

  const ConnectedOrderViewListPage = inject((allStores, nextProps) => (
    // bug https://github.com/mobxjs/mobx-react/issues/110
    // return ({orderService, customerService, ConfirmDialog})
    Object.assign({}, statesAndActions, {orderService, customerService, ConfirmDialog}, nextProps)
  ))(withRouter(observer(OrderListViewPage)))


  const ConnectedOrderViewPage = inject((allStores, nextProps) => (
    // bug https://github.com/mobxjs/mobx-react/issues/110
    // return ({orderService, customerService, ConfirmDialog})
    Object.assign({}, statesAndActions, {orderService, customerService, ConfirmDialog}, nextProps)
  ))(withRouter(observer(OrderViewPage)))

  module = {
    HomePage: ConnectedHomePage,
    OrderListViewPage: ConnectedOrderViewListPage,
    OrderViewPage: ConnectedOrderViewPage

  }

  return module

}

export default register
