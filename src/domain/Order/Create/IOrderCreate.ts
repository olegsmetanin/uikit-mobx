import {ICustomerLookup} from '../../Customer/Lookup/ICustomerLookup'

export interface IOrderCreate {
  customer: ICustomerLookup
  customer1: ICustomerLookup
  name: string
  price: number
}