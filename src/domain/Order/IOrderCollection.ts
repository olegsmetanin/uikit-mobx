import {IOrder} from './IOrder'
import {IOrderCreate} from './Create/IOrderCreate';
import {ILookup} from 'generic';

export interface IOrderCollection {

  prefill: () => Promise<IOrderCreate>

  create: (value: IOrderCreate) => Promise<IOrder>

  getSync: (id: string) => IOrder

  get: (id: string) => Promise<IOrder>

  update: (value: IOrder) => Promise<IOrder>

  delete: (id: string) => Promise<void>

  list: (filter: any, page?: number) => Promise<{value: IOrder[], count: number, page: number}>

  listSync: (filter: any, page?: number) => {value: IOrder[], count: number, page: number}

  lookup: (filter: any, page?: number) => Promise<{value: ILookup[], count: number, page: number}>

}