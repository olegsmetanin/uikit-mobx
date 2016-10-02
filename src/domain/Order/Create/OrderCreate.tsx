
import * as React from 'react'
import {observer, observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {I18n} from 'generic'
import {IOrderCreate} from './IOrderCreate';

export interface IOrderCreateProps {
  value: IOrderCreate
  onDirtyChange?: (isDirty: boolean) => void
  onCreate: (value: IOrderCreate) => void
  onCancel: () => void
  i18n: I18n
  CustomerLookup: any
}

@observer
export class OrderCreate extends React.Component<IOrderCreateProps, void> {

  @observable
  order: IOrderCreate

  constructor(props, context) {
    super(props, context)
    this.order = _.cloneDeep(props.value)
  }

  setDirty(isDirty) {
    this.props.onDirtyChange && this.props.onDirtyChange(isDirty)
  }

  onCreate = () => {
    this.props.onCreate(_.cloneDeep(this.order))
  }

  onCancel = () => {
    this.props.onCancel()
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
        <button onClick={this.onCreate}>Create</button>
        <button onClick={this.onCancel}>Cancel</button>
      </div>
    )
  }
}

export default OrderCreate