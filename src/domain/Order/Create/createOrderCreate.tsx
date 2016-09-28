/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {observable} from 'lib/Reactive'
import {IOrderService} from '../IOrderService';
import {IOrderCreateRequestState} from './IOrderCreateRequestState';
import {IOrderCreateRequest} from './IOrderCreateRequest';
import {OrderCreate} from './OrderCreate';


export const createOrderCreate = (service: IOrderService) => {

  return class extends React.Component<any, any> {

    theState: IOrderCreateRequestState = observable({
      value: {
        customer: {id: '1', name: 'qwe'},
        customer1: {id: '1', name: 'qwe'},
        name: 'Order1',
        price: 123
      },
      isLoading: false,
      isSaving: false,
      isDeleting: false,
      isDirty: false
    })

    create = async (value: IOrderCreateRequest) => {
      let state = this.theState
      state.isLoading = true
      let newValue = await service.create(value)
      state.value = newValue
      state.isLoading = false
    }

    onCreate = async (value: IOrderCreateRequest) => {
      let newValue = await this.create(value)
      this.props.onCreated()
    }

    onCancel = () => {
      this.props.onCancel()
    }

    render() {
      return (
        <OrderCreate
          {...this.props}
          isLoading={this.theState.isLoading}
          value={this.theState.value}
          onCreate={this.onCreate}
          onCancel={this.onCancel}
        />
      )
    }
  }

}
