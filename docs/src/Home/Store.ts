import {observable} from 'mobx';

export interface IStore {
  counter: number;
  counterChanging: boolean;
}

export class Store implements IStore {

  @observable
  counter: number = 0;

  @observable
  counterChanging: boolean = false;

}

export default Store;