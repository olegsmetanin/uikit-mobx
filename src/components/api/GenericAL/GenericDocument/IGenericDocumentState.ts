export interface IGenericDocumentState<M> {
  value: M
  errors: any
  isLoading: boolean
  isSaving: boolean
  isDeleting: boolean
}
