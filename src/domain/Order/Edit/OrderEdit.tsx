
import * as React from 'react'
import {observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {IOrder} from '../View/IOrder'
import {I18n} from 'generic'
import {observer} from 'lib/Reactive';

export interface IOrderEditProps {
  value: IOrder
  onDirtyChange?: (isDirty: boolean) => void
  onSave: (value: IOrder) => void
  onCancel: () => void
  i18n: I18n
  CustomerLookup: any
  isUpdating: boolean
}

@observer
export class OrderEdit extends React.Component<IOrderEditProps, void> {

  @observable
  value: IOrder

  constructor(props, context) {
    super(props, context)
    this.value = _.cloneDeep(props.value)
  }

  setDirty(isDirty) {
    this.props.onDirtyChange && this.props.onDirtyChange(isDirty)
  }

  onSave = () => {
    this.props.onSave(_.cloneDeep(this.value))
  }

  onChangeName = (e) => {
    this.value.name = e.target.value
    this.setDirty(true)
  }

  onChangeCustomer = (customer: {id: string, name: string}) => {
    this.value.customer = customer
    this.setDirty(true)
  }

  onChangeCustomer1 = (customer: {id: string, name: string}) => {
    this.value.customer1 = customer
    this.setDirty(true)
  }

  render() {
    let value = this.value
    const CustomerLookup = this.props.CustomerLookup
    return (
      <div>
        <input type="text" value={value.name} onChange={this.onChangeName}/>
        <CustomerLookup value={value.customer} onChange={this.onChangeCustomer}/>
        <CustomerLookup value={value.customer1} onChange={this.onChangeCustomer1}/>
        <button onClick={this.onSave}>
          {this.props.isUpdating && '!'}Save
        </button>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }
}

export default OrderEdit