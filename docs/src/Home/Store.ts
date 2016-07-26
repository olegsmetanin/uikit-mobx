import {observable, action, runInAction} from 'mobx';

export interface IStore {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export default class Store implements IStore {
  @observable
  counter: number = 0

  @observable
  counterChanging: boolean = false;

  @action increment = async () => {
    runInAction('update counter', () => {
      this.counterChanging = true;
    });
    const delta = await Promise.resolve(1);
    runInAction('counter updated', () => {
      this.counterChanging = false;
      this.counter += delta;
    });
  }

  @action decrement = async () => {
    runInAction('update counter', () => {
      this.counterChanging = true;
    });
    const delta = await Promise.resolve(-1);
    runInAction('counter updated', () => {
      this.counterChanging = false;
      this.counter += delta;
    });
  }
}