import {ILookup} from 'generic'

export interface IOrderCreate {
  customer: ILookup
  customer1: ILookup
  name: string
  price: number
}