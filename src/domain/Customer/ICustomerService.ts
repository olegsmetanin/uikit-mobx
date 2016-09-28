import {ICustomer} from './View/ICustomer'
import {ICustomerLookup} from './Lookup/ICustomerLookup'

export interface ICustomerService {

  get: (id: string) => Promise<ICustomer>

  list: (filter: any, page?: number) => Promise<{value: ICustomer[], count: number, page: number}>

  lookup: (filter: any, page?: number) => Promise<{value: ICustomerLookup[], count: number, page: number}>

}