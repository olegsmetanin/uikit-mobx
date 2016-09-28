import {IOrder} from '../View/IOrder'

export interface IOrderListState {
  value: IOrder[]
  count: number
  page: number
  isLoading: boolean
}