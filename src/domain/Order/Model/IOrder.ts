import {ICustomerLookup} from '../../Customer/Model/ICustomerLookup'
export interface IOrder {
  id: string
  customer: ICustomerLookup
  customer1: ICustomerLookup
  name: string
  price: number
}