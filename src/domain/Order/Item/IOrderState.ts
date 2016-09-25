import {IOrder} from '../Model/IOrder'

export interface IOrderState {
  value: IOrder
  isDirty: boolean
  isLoading: boolean
}