import {IOrder} from './View/IOrder'
import {IOrderLookup} from './Lookup/IOrderLookup'
import {IOrderCreate} from './Create/IOrderCreate';

export interface IOrderService {

  prefill: () => Promise<IOrderCreate>

  create: (value: IOrderCreate) => Promise<IOrder>

  get: (id: string) => Promise<IOrder>

  update: (value: IOrder) => Promise<IOrder>

  delete: (id: string) => Promise<void>

  list: (filter: any, page?: number) => Promise<{value: IOrder[], count: number, page: number}>

  lookup: (filter: any, page?: number) => Promise<{value: IOrderLookup[], count: number, page: number}>

}