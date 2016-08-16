import {observable} from 'mobx';
import {IForm} from '../../../../../src'
import {IHomeState} from './IHomeState'
import {I18n} from '../../../utils/i18n/loadI18n'
import {IComplexFormData} from '../../../../../src/ComplexForm/ComplexForm'

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
  complexFormData: IComplexFormData = null;

  @observable
  complexFormDataIsLoading: boolean = false;

}

export default HomeState;