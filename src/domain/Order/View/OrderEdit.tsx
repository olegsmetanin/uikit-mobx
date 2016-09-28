
import * as React from 'react'
import {observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {IOrder} from './IOrder'
import {I18n} from 'generic'

export interface IOrderEditProps {
  value: IOrder
  onDirtyChange?: (isDirty: boolean) => void
  onSave: (value: IOrder) => void
  i18n: I18n
  CustomerLookup: any
}

export class OrderEdit extends React.Component<IOrderEditProps, void> {

  @observable
  order: IOrder

  constructor(props, context) {
    super(props, context)
    this.order = _.cloneDeep(props.value)
  }

  componentWillReceiveProps(nextProps) {
    console.log('OrderEdit componentWillReceiveProps', nextProps)
    this.order = _.cloneDeep(nextProps.value)
    this.setDirty(false)
  }

  setDirty(isDirty) {
    this.props.onDirtyChange && this.props.onDirtyChange(isDirty)
  }

  onSave = () => {
    this.props.onSave(_.cloneDeep(this.order))
  }

  onChangeName = (e) => {
    this.order.name = e.target.value
    this.setDirty(true)
  }

  onChangeCustomer = (customer: {id: string, name: string}) => {
    this.order.customer = customer
    this.setDirty(true)
  }

  onChangeCustomer1 = (customer: {id: string, name: string}) => {
    this.order.customer1 = customer
    this.setDirty(true)
  }

  render() {
    let order = this.order
    const CustomerLookup = this.props.CustomerLookup
    return (
      <div>
        <input type="text" value={order.name} onChange={this.onChangeName}/>
        <CustomerLookup value={order.customer} onChange={this.onChangeCustomer}/>
        <CustomerLookup value={order.customer1} onChange={this.onChangeCustomer1}/>
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

export default OrderEdit