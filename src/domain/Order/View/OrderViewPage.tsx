import * as React from 'react'

import {observer, observable, transaction} from 'lib/Reactive'
import {IOrderState} from './IOrderState'
import {IOrderViewActions} from './IOrderViewActions'
import {OrderViewActions} from './OrderViewActions'
import {IOrderService} from '../IOrderService'
import {IOrder} from './IOrder'
import {ICustomerService} from '../../Customer/ICustomerService'
import {OrderView} from './OrderView'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'
import {IOrderCreate} from '../Create/IOrderCreate';
import {createOrderEdit} from '../Edit/createOrderEdit';

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

@observer
export class OrderViewPage extends React.Component<IOrderViewPageProps, void> {

  actions: IOrderViewActions

  @observable
  orderState: IOrderState

  @observable
  mode: mode = mode.View

  @observable
  orderCreateRequest: IOrderCreate

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
      isUpdating: false
    }

    this.actions = new OrderViewActions(this.orderState, this.props.orderService)

    this.OrderEdit = observer(
      this.props.OrderEdit || createOrderEdit(this.props.orderService)
    )

  }

  componentDidMount() {
    this.actions.get(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.actions.get(nextProps.params.id)
  }

  onOrderChange = (value: IOrder) => {
    transaction(() => {
      this.orderState.value = value
      this.mode = mode.View
    })
  }

  onCancelEdit = () => {
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

    const OrderEdit = this.OrderEdit

    const {CustomerLookup} = this.props
//    console.log('OrderViewPage OrderEdit ', OrderEdit)

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
              CustomerLookup={CustomerLookup}
              onChange={this.onOrderChange}
              onCancel={this.onCancelEdit}
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