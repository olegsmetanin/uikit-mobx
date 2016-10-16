import {IOrderViewActions} from './IOrderViewActions'
import {IOrderCollection} from '../IOrderCollection'
import {IOrderState} from './IOrderState'
import {IOrder} from '../IOrder';

export class OrderViewActions implements IOrderViewActions {

  state: IOrderState
  collection: IOrderCollection

  constructor(state: IOrderState, collection: IOrderCollection) {
    this.state = state
    this.collection = collection
  }

  get = async (id: string) => {
    let state = this.state
    state.isLoading = true
    let newValue = await this.collection.get(id)
    state.value = newValue
    state.isLoading = false
  }

  update = async (value: IOrder) => {
    this.state.isSaving = true
    const newValue = await this.collection.update(value)
    this.state.value = newValue
    this.state.isSaving = false
  }

  delete = async (id: string) => {
    this.state.isDeleting = true
    await this.collection.delete(id)
    this.state.isDeleting = false
  }

}