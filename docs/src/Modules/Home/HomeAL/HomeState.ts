import {observable} from '../../../lib/Reactive'

import {I18n, IForm, IComplexFormValue} from 'components'
import {IHomeState} from './IHomeState'


export class HomeState implements IHomeState {

  @observable
  i18n: I18n;

  @observable
  counter: number = 0;

  @observable
  counterChanging: boolean = false;

  @observable
  list: IForm[] = null;

  @observable
  listIsLoading: boolean = false;

  @observable
  listItems: IForm[] = null;

  @observable
  complexFormValue: IComplexFormValue = null;

  @observable
  complexFormValueIsLoading: boolean = false;

  @observable
  complexFormValueIsSaving: boolean = false;

}

export default HomeState;