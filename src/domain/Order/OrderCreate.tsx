import * as React from 'react'
import {observer, observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {I18n} from 'generic'
import {IOrder} from './IOrder';
import {ILookup} from 'generic';

export interface IOrderCreateProps {
  value: IOrder
  onDirtyChange?: (isDirty: boolean) => void
  onCreate: (value: IOrder) => void
  onCancel: () => void
  i18n: I18n
  CustomerLookup: any
}

@observer
export class OrderCreate extends React.Component<IOrderCreateProps, void> {

  @observable
  order: IOrder

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

  onChangeCustomer = (customer: ILookup) => {
    this.order.customer = customer
    this.setDirty(true)
  }

  render() {
    let order = this.order
    const {CustomerLookup} = this.props
    return (
      <div>
        <input type="text" value={order.name} onChange={this.onChangeName}/>
        <CustomerLookup value={order.customer} onChange={this.onChangeCustomer}/>
        <button onClick={this.onCreate}>Create</button>
        <button onClick={this.onCancel}>Cancel</button>
      </div>
    )
  }
}

export default OrderCreate