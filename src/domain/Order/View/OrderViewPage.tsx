import * as React from 'react'

import {observer, observable} from 'lib/Reactive'
import {IOrderViewState} from './IOrderViewState'
import {IOrderViewActions} from './IOrderViewActions'
import {OrderViewActions} from './OrderViewActions'
import {IOrderService} from '../IOrderService'
import {IOrder} from './IOrder'
import {OrderEdit} from './OrderEdit'
import {createCustomerLookup} from 'domain/Customer/Lookup/createCustomerLookup'
import {ICustomerService} from '../../Customer/ICustomerService'
import {OrderView} from './OrderView'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'
import {IOrderCreateRequest} from '../Create/IOrderCreateRequest';

export interface IOrderViewPageProps {
  params: {id: string}
  router: any
  route: any
  orderService: IOrderService
  customerService: ICustomerService
  systemActions: ISystemActions
  CustomerLookup: any
  OrderEdit: any,
  ConfirmDialog: any
}

export enum mode {
  View = 1,
  Edit,
  Sign
}

export class OrderViewPage extends React.Component<IOrderViewPageProps, void> {

  actions: IOrderViewActions

  @observable
  orderState: IOrderViewState

  @observable
  mode: mode = mode.View

  @observable
  orderCreateRequest: IOrderCreateRequest

  CustomerLookup: any
  OrderEdit: any

  constructor(props, context) {
    super(props, context)
    console.log('OrderViewPage create')


    this.orderState = {
      value: null,
      isLoading: false,
      isSaving: false,
      isDeleting: false,
      isDirty: false,
    }

    this.actions = new OrderViewActions(this.orderState, this.props.orderService)

    this.CustomerLookup = observer(
      this.props.CustomerLookup || createCustomerLookup(this.props.customerService)
    )

    this.OrderEdit = observer(
      this.props.OrderEdit || OrderEdit
    )

  }

  componentDidMount() {
    this.actions.get(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.actions.get(nextProps.params.id)
  }

  onOrderSave = (value: IOrder) => {
    this.orderState.value = value
    this.mode = mode.View
  }

  onOrderEdit = () => {
    this.mode = mode.Edit
  }

  onOrderSign = () => {
    this.mode = mode.Sign
  }

  onOrderDelete = () => {
    const ConfirmDialog = this.props.ConfirmDialog

    this.props.systemActions.showDialog(
      <ConfirmDialog onConfirm={() => {
        this.actions.delete(this.orderState.value.id)
      }}>
        Are you sure to delete?
      </ConfirmDialog>
    )

  }

  onDirtyChange = (isDirty) => {
    this.props.systemActions.setDirty(isDirty)
  }


  render() {
    console.log('OrderViewPage this.orderState.value', this.orderState.value)
    return (
      <div>
        {this.orderState.value && this.mode === mode.View &&
          (
            <OrderView
              value={this.orderState.value}
              onEdit={this.onOrderEdit}
              onSign={this.onOrderSign}
              onDelete={this.onOrderDelete}
              isDeleting={this.orderState.isDeleting}
            />
          )
        }
        {this.orderState.value && this.mode === mode.Edit &&
          (
            <OrderEdit
              value={this.orderState.value}
              CustomerLookup={this.CustomerLookup}
              onSave={this.onOrderSave}
              onDirtyChange={this.onDirtyChange}
            />
          )
        }
        {!this.orderState.value &&
          (
            <div>
              Loading
            </div>
          )
        }
      </div>

    )
  }

}