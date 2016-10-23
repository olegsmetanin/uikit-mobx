import {ILookup} from 'generic';

export interface IOrderDetail {
  id: string
  product: ILookup
  quantity: number
  price: number
}