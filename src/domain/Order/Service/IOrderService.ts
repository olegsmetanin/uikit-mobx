import {IOrder} from '../Model/IOrder'
import {IOrderLookup} from '../Model/IOrderLookup'

export interface IOrderService {

  get: (id: string) => Promise<IOrder>

  list: (filter: any, page?: number) => Promise<{value: IOrder[], count: number, page: number}>

  lookup: (filter: any, page?: number) => Promise<{value: IOrderLookup[], count: number, page: number}>

}