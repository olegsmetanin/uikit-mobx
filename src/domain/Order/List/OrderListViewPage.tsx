// import * as React from 'react'
//
// import {observer, observable} from 'lib/Reactive'
// // import {ConfirmDialog} from '../../../application/сomponents'
// import {IOrderState} from './IOrderState'
// import {IOrderViewActions} from './IOrderViewActions'
// import {OrderViewActions} from './OrderViewActions'
// import {IOrderService} from '../Service/IOrderService'
// import {IOrder} from '../Model/IOrder'
// import {OrderEdit} from './OrderEdit'
// import {createCustomerLookup} from 'domain/Customer/Lookup/createCustomerLookup'
// import {ICustomerService} from 'domain/Customer/Service/ICustomerService'
// import {OrderView} from './OrderView'
// import {ISystemActions} from 'application/AppAL/System/ISystemActions'
//
// export interface IOrderViewPageProps {
//   params: {id: string}
//   router: any
//   route: any
//   state: IOrderState
//   orderService: IOrderService
//   customerService: ICustomerService
//   systemActions: ISystemActions
//   CustomerLookup: any
//   OrderEdit: any,
//   ConfirmDialog: any
// }
//
// export enum mode {
//   View = 1,
//   Edit,
//   Sign
// }
//
// export class OrderViewPage extends React.Component<IOrderViewPageProps, void> {
//
//   actions: IOrderViewActions
//
//   @observable
//   orderListState: IOrderListState
//
//   CustomerLookup: any
//   OrderEdit: any
//
//   constructor(props, context) {
//     super(props, context)
//     console.log('OrderViewPage create')
//
//
//     this.orderState = {
//       value: null,
//       isLoading: false,
//       isDirty: false
//     }
//
//     this.actions = new OrderViewActions(this.orderState, this.props.orderService)
//
//     this.CustomerLookup = observer(
//       this.props.CustomerLookup || createCustomerLookup(this.props.customerService)
//     )
//
//     this.OrderEdit = observer(
//       this.props.OrderEdit || OrderEdit
//     )
//
//   }
//
//   componentDidMount() {
//     this.actions.get(this.props.params.id)
//   }
//
//   componentWillReceiveProps(nextProps) {
//     this.actions.get(nextProps.params.id)
//   }
//
//   onOrderSave = (value: IOrder) => {
//     this.orderState.value = value
//     this.mode = mode.View
//   }
//
//   onOrderEdit = () => {
//     this.mode = mode.Edit
//   }
//
//   onOrderSign = () => {
//     this.mode = mode.Sign
//   }
//
//   onOrderDelete = () => {
//     const ConfirmDialog = this.props.ConfirmDialog
//
//     this.props.systemActions.showDialog(
//       <ConfirmDialog onConfirm={() => {
//         //this.actions.delete(this.orderState.value.id)
//         console.log('delete order')
//       }}>
//         Are you sure to delete?
//       </ConfirmDialog>
//     )
//
//   }
//
//   onDirtyChange = (isDirty) => {
//     this.props.systemActions.setDirty(isDirty)
//   }
//
//
//   render() {
//     console.log('OrderListViewPage this.orderState.value', this.orderState.value)
//     return (
//       <div>
//         {this.orderState.value && this.mode === mode.View &&
//         (
//           <OrderListView
//             value={this.orderState.value}
//             onEdit={this.onOrderEdit}
//             onSign={this.onOrderSign}
//             onDelete={this.onOrderDelete}
//           />
//         )
//         }
//         {/*this.orderState.value && this.mode === mode.Edit &&
//         (
//           <OrderAdd
//             value={this.orderState.value}
//             onSave={this.onOrderSave}
//             CustomerLookup={this.CustomerLookup}
//             onDirtyChange={this.onDirtyChange}
//           />
//         )
//         */}
//         {!this.orderState.value &&
//         (
//           <div>
//             Loading
//           </div>
//         )
//         }
//       </div>
//
//     )
//   }
//
// }