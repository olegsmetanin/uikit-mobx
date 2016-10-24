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
import {CustomerMockCollection} from 'domain/Customer/CustomerMockCollection'
import {OrderDetailMockCollection} from 'domain/OrderDetail/OrderDetailMockCollection'

// import {ConfirmDialog} from 'application/сomponents'
import {Dialog} from 'application/сomponents'
import {OrderListPage} from 'domain/Order/OrderListPage';
import {withProps} from 'generic/utils/withProps';
import {CustomerLookup} from 'domain/Customer/CustomerLookup';
import {IEventBus} from 'generic';
import {OrderCard} from 'domain/Order/OrderCard';
import {OrderCardPage} from 'domain/Order/OrderCardPage';
import {OrderView} from 'domain/Order/OrderView';
import {OrderEdit} from 'domain/Order/OrderEdit';
import {OrderList} from 'domain/Order/OrderList'
import {OrderListView} from 'domain/Order/OrderListView'

import {OrderDetailList} from 'domain/OrderDetail/OrderDetailList'
import {OrderDetailCard} from 'domain/OrderDetail/OrderDetailCard'
import {OrderDetailListView} from 'domain/OrderDetail/OrderDetailListView'
import {OrderDetailListItemView} from 'domain/OrderDetail/OrderDetailListItemView'
import {OrderDetailView} from 'domain/OrderDetail/OrderDetailView'
import {OrderDetailEdit} from 'domain/OrderDetail/OrderDetailEdit'

import {OrderListItemView} from 'domain/Order/OrderListItemView'

import {OrderListTableHeader} from 'domain/Order/OrderListTableHeader'

import {OrderDetailListTableHeader} from 'domain/OrderDetail/OrderDetailListTableHeader'
// import {ProductMockCollection} from 'domain/Product/ProductMockCollection'

import {ORDER_ITEM_CHANGE} from 'domain/Order/OrderCollectionEvents'
import {ORDERDETAIL_ITEM_CHANGE} from 'domain/OrderDetail/OrderDetailCollectionEvents'

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

  const orderCollection = new OrderMockCollection({path: '/', eventBus})
  const customerCollection = new CustomerMockCollection({path: '/', eventBus})

  const ConnectedCustomerLookup = withProps(() => ({
    i18n: appState.i18n,
    collection: customerCollection,
    eventBus: eventBus
  }))(CustomerLookup)

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

  // Product
  // const productCollection = new ProductMockCollection('/', eventBus)

  // const ConnectedProductLookup = withProps(() => ({
  //   i18n: appState.i18n,
  //   collection: productCollection,
  //   eventBus: eventBus
  // }))(CustomerLookup)


  // OrderDetail
  const orderDetailCollection = new OrderDetailMockCollection({path: '/', eventBus})

  const ConnectedOrderDetailEdit = withProps(() => ({
  }))(OrderDetailEdit)

  const ConnectedOrderDetailListView = withProps(() => ({
    ListItemView: OrderDetailListItemView,
    ListTableHeader: OrderDetailListTableHeader
  }))(OrderDetailListView)

  const ConnectedOrderDetailCard = withProps(() => ({
    collection: orderDetailCollection,
    View: OrderDetailView,
    Edit: ConnectedOrderDetailEdit,
    onDirtyChange,
    onDelete,
    Dialog,
    onGotoList
  }))(OrderDetailCard)

  const ConnectedOrderDetailList = withProps(() => ({
    collection: orderDetailCollection,
    ListView: ConnectedOrderDetailListView,
    Card: ConnectedOrderDetailCard,
    eventBus: eventBus,
    EVENT_ITEM_CHANGE: ORDERDETAIL_ITEM_CHANGE
  }))(OrderDetailList)


  // Order
  const ConnectedOrderEdit = withProps(() => ({
    CustomerLookup: ConnectedCustomerLookup
  }))(OrderEdit)

  const ConnectedOrderView = withProps(() => ({
    OrderDetailList: ConnectedOrderDetailList
  }))(OrderView)

  const ConnectedOrderCard = withProps(() => ({
    collection: orderCollection,
    View: ConnectedOrderView,
    Edit: ConnectedOrderEdit,
    onDirtyChange,
    onDelete,
    Dialog,
    onGotoList
  }))(OrderCard)

  const ConnectedOrderCardPage = withRouter(
    withProps(() => ({
      i18n: appState.i18n,
      Card: ConnectedOrderCard
    }))(OrderCardPage)
  )

  // List
  const ConnectedOrderListView = withProps(() => ({
    ListItemView: OrderListItemView,
    ListTableHeader: OrderListTableHeader
  }))(OrderListView)

  const ConnectedOrderList = withProps(() => ({
    collection: orderCollection,
    ListView: ConnectedOrderListView,
    Card: ConnectedOrderCard,
    eventBus: eventBus,
    EVENT_ITEM_CHANGE: ORDER_ITEM_CHANGE
  }))(OrderList)

  const ConnectedOrderListPage = withRouter(
    withProps(() => ({
      // i18n: appState.i18n,
      List: ConnectedOrderList
    }))(OrderListPage)
  )


  module = {
    HomePage: ConnectedHomePage,
    OrderListViewPage: ConnectedOrderListPage,
    OrderViewPage: ConnectedOrderCardPage
  }

  return module

}

export default register
