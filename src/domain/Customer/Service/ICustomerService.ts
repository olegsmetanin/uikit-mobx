import {ICustomer} from '../Model/ICustomer'
import {ICustomerLookup} from '../Model/ICustomerLookup'

export interface ICustomerService {

  get: (id: string) => Promise<ICustomer>

  list: (filter: any, page?: number) => Promise<{value: ICustomer[], count: number, page: number}>

  lookup: (filter: any, page?: number) => Promise<{value: ICustomerLookup[], count: number, page: number}>

}