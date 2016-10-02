/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {observable} from 'lib/Reactive'
import {IOrderService} from '../IOrderService';
import {IOrderCreateState} from './IOrderCreateState';
import {IOrderCreate} from './IOrderCreate';
import {OrderCreate} from './OrderCreate';


export const createOrderCreate = (service: IOrderService) => {

  return class extends React.Component<any, any> {

    theState: IOrderCreateState = observable({
      value: null,
      isLoading: false,
      isSaving: false,
      isDeleting: false,
      isDirty: false
    })

    componentDidMount() {
      this.prefill()
    }

    prefill = async () => {
      let state = this.theState
      state.isLoading = true
      let newValue = await service.prefill()
      state.value = newValue
      state.isLoading = false
    }

    create = async (value: IOrderCreate) => {
      let state = this.theState
      state.isLoading = true
      let newValue = await service.create(value)
      state.value = newValue
      state.isLoading = false
    }

    onCreate = async (value: IOrderCreate) => {
      await this.create(value)
      this.props.onCreated()
    }

    onCancel = () => {
      this.props.onCancel()
    }

    render() {
      return (
        this.theState.value
          ? (
              <OrderCreate
                {...this.props}
                isLoading={this.theState.isLoading}
                value={this.theState.value}
                onCreate={this.onCreate}
                onCancel={this.onCancel}
              />
          )
          : null
      )
    }
  }

}
