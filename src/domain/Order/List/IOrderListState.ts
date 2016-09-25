import {IOrder} from '../Model/IOrder'

export interface IOrderListState {
  value: IOrder[]
  count: number
  page: number
  isLoading: boolean
}