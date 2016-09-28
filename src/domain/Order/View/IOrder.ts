import {ICustomerLookup} from '../../Customer/Lookup/ICustomerLookup'

export interface IOrder {
  id: string
  customer: ICustomerLookup
  customer1: ICustomerLookup
  name: string
  price: number
}