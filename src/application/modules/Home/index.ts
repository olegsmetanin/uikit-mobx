import {observer, inject} from 'lib/Reactive'

import {IAppState} from '../../AppAL/IAppState'
import {IUserActions} from '../../AppAL/User/IUserActions'
import {ISystemActions} from '../../AppAL/System/ISystemActions'

import {IHomeModule} from './IHomeModule'
import {HomeState} from './HomeAL/HomeState'
import {HomeService} from './HomeAL/HomeService'
import {HomeActions} from './HomeAL/HomeActions'

import {HomePage} from './pages/HomePage'
import {SimplePage} from './pages/SimplePage'
import {withRouter} from 'lib/Router'
// import {OrderViewPage} from 'domain/Order/View/OrderViewPage'
import {OrderMockCollection} from 'domain/Order/OrderMockCollection'
import {CustomerMockCollection} from 'domain/Customer/CustomerMockCollection'
import {OrderDetailMockCollection} from 'domain/OrderDetail/OrderDetailMockCollection'

// import {ConfirmDialog} from 'application/сomponents'
import {Dialog} from 'application/сomponents'
import {OrderListPage} from 'domain/Order/OrderListPage.gen';
import {withProps} from 'generic/utils/withProps';
import {CustomerLookup} from 'domain/Customer/CustomerLookup.gen';
import {IEventBus} from 'generic';
import {OrderCard} from 'domain/Order/OrderCard.gen';
import {OrderCardPage} from 'domain/Order/OrderCardPage.gen';
import {OrderView} from 'domain/Order/OrderView.gen';
import {OrderEdit} from 'domain/Order/OrderEdit.gen';
import {OrderList} from 'domain/Order/OrderList.gen'
import {OrderListView} from 'domain/Order/OrderListView.gen'

import {OrderDetailList} from 'domain/OrderDetail/OrderDetailList.gen'
import {OrderDetailCard} from 'domain/OrderDetail/OrderDetailCard.gen'
import {OrderDetailListView} from 'domain/OrderDetail/OrderDetailListView.gen'
import {OrderDetailListItemView} from 'domain/OrderDetail/OrderDetailListItemView.gen'
import {OrderDetailView} from 'domain/OrderDetail/OrderDetailView.gen'
import {OrderDetailEdit} from 'domain/OrderDetail/OrderDetailEdit.gen'

import {OrderDetailListV2} from 'domain/OrderDetail/OrderDetailListV2'
import {OrderDetailListViewV2} from 'domain/OrderDetail/OrderDetailListViewV2'
import {OrderDetailListFilter} from 'domain/OrderDetail/OrderDetailListFilter'


import {OrderListItemView} from 'domain/Order/OrderListItemView'

import {OrderListTableHeader} from 'domain/Order/OrderListTableHeader'

import {OrderDetailListTableHeader} from 'domain/OrderDetail/OrderDetailListTableHeader'
// import {ProductMockCollection} from 'domain/Product/ProductMockCollection'

import {ORDER_ITEM_CHANGE} from 'domain/Order/OrderCollectionEvents.gen'
import {ORDERDETAIL_ITEM_CHANGE} from 'domain/OrderDetail/OrderDetailCollectionEvents.gen'

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

  // await homeActions.loadLang(
  //   appState.system.lang,
  //   () => appState.i18n
  // )

  // reaction(
  //   () => appState.system && appState.system.lang,
  //   lang => homeActions.loadLang(lang, () => appState.i18n)
  // )

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

  const ConnectedSimplePage = observer(withProps(() => ({
    i18n: appState.i18n,
    layoutWidth: appState.layoutWidth
  }))(SimplePage))


  const store = {}

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

  // const ConnectedOrderDetailListView = withProps(() => ({
  //   ListItemView: OrderDetailListItemView,
  //   ListTableHeader: OrderDetailListTableHeader
  // }))(OrderDetailListView)

  const ConnectedOrderDetailListView = withProps(() => ({
    ListItemView: OrderDetailListItemView,
    ListTableHeader: OrderDetailListTableHeader,
    Filter: OrderDetailListFilter
  }))(OrderDetailListViewV2)

  const ConnectedOrderDetailCard = withProps(() => ({
    collection: orderDetailCollection,
    View: OrderDetailView,
    Edit: ConnectedOrderDetailEdit,
    onDirtyChange,
    onDelete,
    Dialog,
    onGotoList,
    cid: 'orderdetailcard'
  }))(OrderDetailCard)

  // const ConnectedOrderDetailList = withProps(() => ({
  //   collection: orderDetailCollection,
  //   ListView: ConnectedOrderDetailListView,
  //   Card: ConnectedOrderDetailCard,
  //   eventBus: eventBus,
  //   EVENT_ITEM_CHANGE: ORDERDETAIL_ITEM_CHANGE,
  //   cid: 'orderdetaillist',
  //   store
  // }))(OrderDetailList)

  const ConnectedOrderDetailList = withProps(() => ({
    collection: orderDetailCollection,
    ListView: ConnectedOrderDetailListView,
    Card: ConnectedOrderDetailCard,
    eventBus: eventBus,
    EVENT_ITEM_CHANGE: ORDERDETAIL_ITEM_CHANGE,
    cid: 'orderdetaillist',
    store
  }))(OrderDetailListV2)


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
    onGotoList,
    cid: 'ordercard'
  }))(OrderCard)

  const ConnectedOrderCardPage = withRouter(
    withProps(() => ({
      i18n: appState.i18n,
      Card: ConnectedOrderCard,
      pid: '',
      cid: 'ordercardpage'
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
    EVENT_ITEM_CHANGE: ORDER_ITEM_CHANGE,
    cid: 'orderlist'
  }))(OrderList)

  const ConnectedOrderListPage = withRouter(
    withProps(() => ({
      // i18n: appState.i18n,
      List: ConnectedOrderList,
      cid: 'orderlistpage',
      pid: ''
    }))(OrderListPage)
  )


  module = {
    HomePage: ConnectedHomePage,
    SimplePage: ConnectedSimplePage,
    OrderListViewPage: ConnectedOrderListPage,
    OrderViewPage: ConnectedOrderCardPage
  }

  return module

}

export default register
