import {ILookup} from 'generic';

export interface IOrder {
  id: string
  customer: ILookup
  customer1: ILookup
  name: string
  price: number
}