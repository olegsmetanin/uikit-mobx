import {observable, action, runInAction} from 'mobx';
import {IService} from './Service';

export interface IStore {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export default class Store implements IStore {

  service: IService;

  constructor({service}: {service: IService}) {
    this.service = service;
  }

  @observable
  counter: number = 0;

  @observable
  counterChanging: boolean = false;

  @action increment = async () => {
    runInAction('update counter', () => {
      this.counterChanging = true;
    });
    const delta = await Promise.resolve(1);
    runInAction('counter updated', () => {
      this.counter += delta;
      this.counterChanging = false;
    });
  }

  @action decrement = async () => {
    runInAction('update counter', () => {
      this.counterChanging = true;
    });
    const delta = await Promise.resolve(-1);
    runInAction('counter updated', () => {
      this.counter += delta;
      this.counterChanging = false;
    });
  }

}