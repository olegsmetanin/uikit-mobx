
import * as React from 'react'
import {observer, observable} from 'lib/Reactive'

import * as _ from 'lodash'
import {IOrderDetail} from './IOrderDetail.gen'
import {I18n} from 'generic'
// import {ILookup} from 'generic'

export interface IOrderDetailEditProps {
  value: IOrderDetail
  onDirtyChange?: (isDirty: boolean) => void
  onSave: (value: IOrderDetail) => void
  onCancel: () => void
  i18n: I18n
  isUpdating: boolean
  isSaving: boolean
  errors: any

}

@observer
export class OrderDetailEdit extends React.Component<IOrderDetailEditProps, void> {

  @observable
  value: IOrderDetail

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

  render() {
    // const CustomerLookup = this.props.CustomerLookup
    return (
      <div>
        value: {JSON.stringify(this.props.value)}
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

export default OrderDetailEdit