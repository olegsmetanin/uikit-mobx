
import {ILookup} from 'generic';

export interface ICustomerLookupState {
  value: ILookup[]
  count: number
  page: number
  isLoading: boolean
}