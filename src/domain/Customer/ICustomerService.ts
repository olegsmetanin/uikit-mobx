import {ICustomer} from './View/ICustomer'
import {ILookup} from 'generic';

export interface ICustomerService {

  get: (id: string) => Promise<ICustomer>

  list: (filter: any, page?: number) => Promise<{value: ICustomer[], count: number, page: number}>

  lookup: (filter: any, page?: number) => Promise<{value: ILookup[], count: number, page: number}>

}