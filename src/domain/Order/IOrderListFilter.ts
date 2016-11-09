import {ILookup} from 'generic';

export interface IOrderListFilter {
  customer?: ILookup
  name?: string
  price?: number
}