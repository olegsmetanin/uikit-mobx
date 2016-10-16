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
// import {OrderViewPage} from 'domain/Order/View/OrderViewPage'
import {OrderMockCollection} from 'domain/Order/OrderMockCollection'
import {CustomerMockService} from 'domain/Customer/CustomerMockService'

import {ConfirmDialog} from 'application/сomponents'
import {Dialog} from 'application/сomponents'
import {OrderListViewPage} from 'domain/Order/List/OrderListViewPage';
import {withProps} from 'generic/utils/withProps';
import {CustomerLookup} from 'domain/Customer/Lookup/CustomerLookup';
import {IEventBus} from 'generic';
import {OrderCard} from 'domain/Order/Card/OrderCard';
import {OrderCardPage} from 'domain/Order/Card/OrderCardPage';
import {OrderView} from 'domain/Order/Card/OrderView';
import {OrderEdit} from 'domain/Order/Card/OrderEdit';

// singleton )
let module: IHomeModule = null

const register = async ({
    appState,
    userActions,
    systemActions,
    eventBus
    // httpClient
  }: {
    appState: IAppState,
    userActions: IUserActions,
    systemActions: ISystemActions,
    eventBus: IEventBus
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

  const orderCollection = new OrderMockCollection('/')
  const customerService = new CustomerMockService('/')

  const ConnectedCustomerLookup = withProps(() => ({
    i18n: appState.i18n,
    service: customerService,
    eventBus: eventBus
  }))(CustomerLookup)

  const ConnectedOrderViewListPage = inject((allStores, nextProps) => (
    // bug https://github.com/mobxjs/mobx-react/issues/110
    // return ({orderService, customerService, ConfirmDialog})
    Object.assign({}, statesAndActions, {
      orderCollection,
      customerService,
      ConfirmDialog,
      CustomerLookup: ConnectedCustomerLookup
    }, nextProps)
  ))(withRouter(observer(OrderListViewPage)))




  const ConnectedOrderEdit = withProps(() => ({
    CustomerLookup: ConnectedCustomerLookup
  }))(OrderEdit)

const onDirtyChange = (memId: string, isDirty: boolean) => {
  console.log('onDirtyChange memId, isDirty', memId, isDirty)
}

const onDelete = () => {
  console.log('onDelete')
  // move to list page
}

const onGotoList = () => {
  // navigate go list page
}

  const ConnectedOrderCard = withProps(() => ({
    orderCollection,
    OrderView: OrderView,
    OrderEdit: ConnectedOrderEdit,
    onDirtyChange,
    onDelete,
    Dialog,
    onGotoList
  }))(OrderCard)


  const ConnectedOrderCardPage = withRouter(
      withProps(() => ({
        i18n: appState.i18n,
        OrderCard: ConnectedOrderCard
      }))(OrderCardPage)
  )

  module = {
    HomePage: ConnectedHomePage,
    OrderListViewPage: ConnectedOrderViewListPage,
    OrderViewPage: ConnectedOrderCardPage

  }

  return module

}

export default register
