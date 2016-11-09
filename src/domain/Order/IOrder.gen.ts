import {ILookup} from 'generic'
import {IOrderStatus} from './IOrderStatus'

export interface IOrder {
  id: string
  customer: ILookup
  name: string
  price: number
  status: IOrderStatus
}