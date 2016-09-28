import {IOrder} from './View/IOrder'
import {IOrderLookup} from './Lookup/IOrderLookup'
import {IOrderCreateRequest} from './Create/IOrderCreateRequest';

export interface IOrderService {

  create: (createRequest: IOrderCreateRequest) => Promise<IOrder>

  get: (id: string) => Promise<IOrder>

  update: (value: IOrder) => Promise<IOrder>

  delete: (id: string) => Promise<void>

  list: (filter: any, page?: number) => Promise<{value: IOrder[], count: number, page: number}>

  lookup: (filter: any, page?: number) => Promise<{value: IOrderLookup[], count: number, page: number}>

}