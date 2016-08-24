import {IGenericDocumentState} from 'components'
import {ISomeDoc} from 'components'
import {observable} from 'lib/Reactive'

export class SomeDocState implements IGenericDocumentState<ISomeDoc> {

  @observable
  value: ISomeDoc = null

  @observable
  errors: any = null

  @observable
  isLoading: boolean = false

  @observable
  isSaving: boolean = false

  @observable
  isDeleting: boolean = false

}

export default SomeDocState