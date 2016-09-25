
import * as React from 'react'
import {observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {IOrder} from '../Model/IOrder'
import {IOrderState} from './IOrderState'
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
  orderEditState: IOrderState

  constructor(props, context) {
    super(props, context)
    this.orderEditState = {
      value: _.cloneDeep(props.value),
      isDirty: false,
      isLoading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('OrderEdit componentWillReceiveProps', nextProps)
    this.orderEditState.value = _.cloneDeep(nextProps.value)
    this.orderEditState.isDirty = false
    this.setDirty(false)
  }

  setDirty(isDirty) {
    this.props.onDirtyChange && this.props.onDirtyChange(isDirty)
  }

  onSave = () => {
    this.props.onSave(_.cloneDeep(this.orderEditState.value))
  }

  onChangeName = (e) => {
    this.orderEditState.value.name = e.target.value
    this.setDirty(true)
  }

  onChangeCustomer = (customer: {id: string, name: string}) => {
    this.orderEditState.value.customer = customer
    this.setDirty(true)
  }

  onChangeCustomer1 = (customer: {id: string, name: string}) => {
    this.orderEditState.value.customer1 = customer
    this.setDirty(true)
  }

  render() {
    let orderEditState = this.orderEditState
    const CustomerLookup = this.props.CustomerLookup
    return (
      <div>
        <input type="text" value={orderEditState.value.name} onChange={this.onChangeName}/>
        <CustomerLookup value={orderEditState.value.customer} onChange={this.onChangeCustomer}/>
        <CustomerLookup value={orderEditState.value.customer1} onChange={this.onChangeCustomer1}/>
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

export default OrderEdit