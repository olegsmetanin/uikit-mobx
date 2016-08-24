import {IGenericDocumentActions} from './IGenericDocumentActions'
import {IGenericDocumentState} from './IGenericDocumentState'
import {IGenericDocumentService} from './IGenericDocumentService'

export abstract class GenericDocumentActions<M, F, CR> implements IGenericDocumentActions<M, F, CR> {

  constructor(state: IGenericDocumentState<M>, service: IGenericDocumentService<M, F, CR>) {
    this.state = state;
    this.service = service;
  }

  state: IGenericDocumentState<M>

  service: IGenericDocumentService<M, F, CR>

  get = async (id: string) => {
    this.state.isLoading = true
    const value = await this.service.get(id)
    this.state.value = value
    this.state.isLoading = false
  }

  update = async (value: M) => {
    this.state.isSaving = true
    const newValue = await this.service.update(value)
    this.state.value = newValue
    this.state.isSaving = false
  }

  delete = async (id: string) => {
    this.state.isDeleting = true
    await this.service.delete(id)
    this.state.isDeleting = false
  }

}