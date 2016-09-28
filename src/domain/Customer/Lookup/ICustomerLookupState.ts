
import {ICustomerLookup} from './ICustomerLookup'

export interface ICustomerLookupState {
  value: ICustomerLookup[]
  count: number
  page: number
  isLoading: boolean
}