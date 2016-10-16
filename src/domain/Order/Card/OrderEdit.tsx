
import * as React from 'react'
import {observer, observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {IOrder} from '../IOrder'
import {I18n} from 'generic'
import {ILookup} from 'generic'

export interface IOrderEditProps {
  value: IOrder
  onDirtyChange?: (isDirty: boolean) => void
  onSave: (value: IOrder) => void
  onCancel: () => void
  i18n: I18n
  CustomerLookup: any
  isUpdating: boolean
  isSaving: boolean

}

@observer
export class OrderEdit extends React.Component<IOrderEditProps, void> {

  @observable
  value: IOrder



  constructor(props, context) {
    super(props, context)
    this.value = _.cloneDeep(props.value)
  }

  setDirty = () => {
    this.props.onDirtyChange && this.props.onDirtyChange(true)
  }

  onSave = () => {
    this.props.onSave(_.cloneDeep(this.value))
  }

  onCancel = () => {
    this.props.onCancel()
  }

  onChangeName = (e) => {
    this.value.name = e.target.value
    this.setDirty()
  }

  onChangeCustomer = (customer: ILookup) => {
    this.value.customer = customer
    this.setDirty()
  }

  onChangeCustomer1 = (customer: ILookup) => {
    this.value.customer1 = customer
    this.setDirty()
  }

  render() {
    const CustomerLookup = this.props.CustomerLookup
    return (
      <div>
        <input type="text" value={this.value.name} onChange={this.onChangeName}/>
        <CustomerLookup value={this.value.customer} onChange={this.onChangeCustomer}/>
        <CustomerLookup value={this.value.customer1} onChange={this.onChangeCustomer1}/>
        <button onClick={this.onSave}>
          {this.props.isSaving
            ? 'Saving...'
            : 'Save'
          }
        </button>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }
}

export default OrderEdit