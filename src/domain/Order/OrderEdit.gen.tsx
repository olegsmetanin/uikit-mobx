import * as React from 'react'
import {observer, observable, toJS} from 'lib/Reactive'

import {IOrder} from './IOrder.gen'
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
  errors: any

}

@observer
export class OrderEdit extends React.Component<IOrderEditProps, void> {

  @observable
  value: IOrder

  constructor(props, context) {
    super(props, context)
    this.value = toJS(props.value)
  }

  setDirty = () => {
    this.props.onDirtyChange && this.props.onDirtyChange(true)
  }

  onSave = () => {
    this.props.onSave(toJS(this.value))
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

  render() {
    const CustomerLookup = this.props.CustomerLookup
    return (
      <div>
        <input type="text" value={this.value.name} onChange={this.onChangeName}/>
        <CustomerLookup value={this.value.customer} onChange={this.onChangeCustomer}/>
        {this.props.errors && (
          'Errors!: ' + JSON.stringify(this.props.errors)
        )}
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