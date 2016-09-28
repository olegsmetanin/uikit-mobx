import {IOrder} from './IOrder'

export interface IOrderViewState {
  value: IOrder
  isLoading: boolean,
  isSaving: boolean,
  isDeleting: boolean,
  isDirty: boolean
}