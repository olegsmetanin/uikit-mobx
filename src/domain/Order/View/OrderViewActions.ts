import {IOrderViewActions} from './IOrderViewActions'
import {IOrderService} from '../IOrderService'
import {IOrderState} from './IOrderState'
import {IOrder} from './IOrder';

export class OrderViewActions implements IOrderViewActions {

  state: IOrderState
  service: IOrderService

  constructor(state: IOrderState, service: IOrderService) {
    this.state = state
    this.service = service
  }

  get = async (id: string) => {
    let state = this.state
    state.isLoading = true
    let newValue = await this.service.get(id)
    state.value = newValue
    state.isLoading = false
  }

  update = async (value: IOrder) => {
    this.state.isSaving = true
    const newValue = await this.service.update(value)
    this.state.value = newValue
    this.state.isSaving = false
  }

  delete = async (id: string) => {
    this.state.isDeleting = true
    await this.service.delete(id)
    this.state.isDeleting = false
  }

}