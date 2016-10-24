import {ILookup} from 'generic';

export interface IOrder {
  id: string
  customer: ILookup
  name: string
  price: number
}