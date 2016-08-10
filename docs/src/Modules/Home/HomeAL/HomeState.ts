import {observable} from 'mobx';
import {IForm} from '../../../../../src'
import {IHomeState} from './interfaces'
import {I18n} from '../../../utils/i18n/loadI18n'

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

}

export default HomeState;