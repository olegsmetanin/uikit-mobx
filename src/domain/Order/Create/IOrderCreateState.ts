import {IOrderCreate} from './IOrderCreate';

export interface IOrderCreateState {
  value: IOrderCreate
  isLoading: boolean,
  isSaving: boolean,
  isDeleting: boolean,
  isDirty: boolean
}