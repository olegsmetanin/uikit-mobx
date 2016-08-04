import {IService} from './Service';
import {Store} from './Store';

export class Actions {
  store: Store;
  service: IService;

  constructor({store, service}: {store: Store, service: IService}) {
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

  loadList = async () => {
    let store = this.store;
    let service = this.service;
    store.listIsLoading = true;
    let list = await service.getList();
    store.list = list;
    store.listIsLoading = false;
  };

  saveItem = async (item) => {
    let store = this.store;
    let service = this.service;
    let newItem = await service.saveItem(item);
    const index = store.list.findIndex(item => item.id === newItem.id);
    store.list[index] = newItem;
  };

}

export default Actions;