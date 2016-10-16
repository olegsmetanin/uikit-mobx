import {IOrder} from '../IOrder'

export interface IOrderState {
  value: IOrder
  isLoading: boolean,
  isUpdating: boolean,
  isSaving: boolean,
  isDeleting: boolean,
  isDirty: boolean
}