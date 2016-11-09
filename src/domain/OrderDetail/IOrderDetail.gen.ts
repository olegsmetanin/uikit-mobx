import {ILookup} from 'generic';

export interface IOrderDetail {
  id: string
  order?: ILookup
  product: ILookup
  quantity: number
  price: number
}