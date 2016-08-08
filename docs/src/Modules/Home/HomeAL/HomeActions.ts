import {IHomeService, IHomeState, IHomeActions} from './interfaces';

export class HomeActions implements IHomeActions {
  state: IHomeState;
  service: IHomeService;

  constructor({state, service}: {state: IHomeState, service: IHomeService}) {
    this.state = state;
    this.service = service;
  }

  incrementCounter = async () => {
    let store = this.state;
    store.counterChanging = true;
    const delta = await Promise.resolve(1);
    store.counter += delta;
    store.counterChanging = false;
  };

  decrementCounter = async () => {
    let store = this.state;
    store.counterChanging = true;
    const delta = await Promise.resolve(-1);
    store.counter += delta;
    store.counterChanging = false;
  };

  loadList = async () => {
    let store = this.state;
    let service = this.service;
    store.listIsLoading = true;
    let list = await service.getList();
    store.list = list;
    store.listIsLoading = false;
  };

  saveItem = async (item) => {
    let store = this.state;
    let service = this.service;
    let newItem = await service.saveItem(item);
    const index = store.list.findIndex(item => item.id === newItem.id);
    store.list[index] = newItem;
  };

}

export default HomeActions;