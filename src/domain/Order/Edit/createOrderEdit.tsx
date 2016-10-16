/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {observable} from 'lib/Reactive'
import {IOrderCollection} from '../IOrderCollection';
import {OrderEdit} from './OrderEdit';
import {IOrderState} from '../View/IOrderState';
import {IOrder} from '../IOrder';

/*
*
* Final usage:
* let OrderEdit = createOrderEdit(orderService)
*
* render() {
*   return (
*     <OrderEdit
*       value={this.viewValue}
*       onChange={this.onChange}
*       onCancel={this.onCancel}
*     />
*   )
* }
*
*/

export const createOrderEdit = (collection: IOrderCollection) => {

  return class extends React.Component<any, any> {

    theState: IOrderState

    constructor(props, context) {
      super(props, context)
      this.theState = observable({
        value: this.props.value,
        isLoading: false,
        isSaving: false,
        isUpdating: false,
        isDeleting: false,
        isDirty: false
      })
    }

    update = async (value: IOrder) => {
      let state = this.theState
      state.isUpdating = true
      let newValue = await collection.update(value)
      console.log('createOrderEdit update newValue', newValue)
      state.value = newValue
      state.isUpdating = false
    }

    onSave = async (value: IOrder) => {
      await this.update(value)
      this.props.onChange(this.theState.value)
    }

    render() {
      return (
        <div>
          {this.theState.isLoading && (
            <div>
              Loading...
            </div>
          )}
          {this.theState.value && (
            <OrderEdit
              {...this.props}
              value={this.theState.value}
              onSave={this.onSave}
              onCancel={this.props.onCancel}
              isUpdating={this.theState.isUpdating}
            />
          )}
        </div>
      )
    }
  }

}
