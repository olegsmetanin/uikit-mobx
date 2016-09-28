import {IOrderCreateRequest} from './IOrderCreateRequest';

export interface IOrderCreateRequestState {
  value: IOrderCreateRequest
  isLoading: boolean,
  isSaving: boolean,
  isDeleting: boolean,
  isDirty: boolean
}