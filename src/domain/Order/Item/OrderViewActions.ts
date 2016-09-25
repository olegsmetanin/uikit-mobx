import {IOrderViewActions} from './IOrderViewActions'
import {IOrderService} from '../Service/IOrderService'
import {IOrderCardState} from './IOrderViewState'

export class OrderViewActions implements IOrderViewActions {

  state: IOrderCardState
  service: IOrderService

  constructor(state: IOrderCardState, service: IOrderService) {
    this.state = state
    this.service = service
  }

  get = async (id: string) => {
    let state = this.state
    state.isLoading = true
    let value = await this.service.get(id)
    state.value = value
    state.isLoading = false
  }
}