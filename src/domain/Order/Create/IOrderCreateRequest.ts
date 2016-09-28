import {ICustomerLookup} from '../../Customer/Lookup/ICustomerLookup'

export interface IOrderCreateRequest {
  customer: ICustomerLookup
  customer1: ICustomerLookup
  name: string
  price: number
}