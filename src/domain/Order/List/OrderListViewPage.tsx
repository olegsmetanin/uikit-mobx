import * as React from 'react'

import {observer, observable} from 'lib/Reactive'
import {IOrderService} from '../IOrderService'
import {createCustomerLookup} from 'domain/Customer/Lookup/createCustomerLookup'
import {ICustomerService} from '../../Customer/ICustomerService'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'
import {IOrderListState} from './IOrderListState';
import {IOrderListActions} from './IOrderListActions';
import {OrderListActions} from './OrderListActions';
import {OrderListView} from './OrderListView';
import {createOrderCreate} from '../Create/createOrderCreate';

export interface IOrderViewPageProps {
  orderService: IOrderService
  systemActions: ISystemActions
  customerService: ICustomerService
  CustomerLookup: any
  OrderCreate: any
}

export enum mode {
  List = 1,
  Create
}

export class OrderListViewPage extends React.Component<IOrderViewPageProps, void> {

  actions: IOrderListActions

  @observable
  orderListState: IOrderListState

  CustomerLookup: any
  OrderCreate: any

  constructor(props, context) {
    super(props, context)
    console.log('OrderViewPage create')


    this.orderListState = {
      value: null,
      count: 0,
      page: 0,
      isLoading: false
    }

    this.actions = new OrderListActions(this.orderListState, this.props.orderService)

    this.CustomerLookup = observer(
      this.props.CustomerLookup || createCustomerLookup(this.props.customerService)
    )

    this.OrderCreate = observer(
      this.props.OrderCreate || createOrderCreate(this.props.orderService)
    )

  }

  componentDidMount() {
    this.onReload()
  }

  onReload = () => {
    this.actions.list({})
  }

  onDirtyChange = (isDirty) => {
    this.props.systemActions.setDirty(isDirty)
  }

  render() {
    console.log('OrderListViewPage this.orderListState.value', this.orderListState.value)
    return (
      <div>
        {this.orderListState.isLoading && (
          <div>
            Loading
          </div>
        )}
        {this.orderListState.value &&
          (
            <OrderListView
              value={this.orderListState.value}
              OrderCreate={this.OrderCreate}
              onDirtyChange={this.onDirtyChange}
              CustomerLookup={this.CustomerLookup}
              onReload={this.onReload}
            />
          )
        }
      </div>

    )
  }

}