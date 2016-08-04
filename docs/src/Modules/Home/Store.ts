import {observable} from 'mobx';
import {IForm} from '../../../../src'

export class Store {

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

export default Store;