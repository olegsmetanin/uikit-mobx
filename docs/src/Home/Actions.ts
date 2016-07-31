import {IService} from './Service';
import {IStore} from './Store';

export interface IActions {
  incrementCounter: () => void;
  decrementCounter: () => void;
}

export class Actions implements IActions {
  store: IStore;
  service: IService;

  constructor({store, service}: {store: IStore, service: IService}) {
    this.store = store;
    this.service = service;
  }

  incrementCounter = async () => {
    let store = this.store;
    store.counterChanging = true;
    const delta = await Promise.resolve(1);
    store.counter += delta;
    store.counterChanging = false;
  };

  decrementCounter = async () => {
    let store = this.store;
    store.counterChanging = true;
    const delta = await Promise.resolve(-1);
    store.counter += delta;
    store.counterChanging = false;
  };

}

export default Actions;