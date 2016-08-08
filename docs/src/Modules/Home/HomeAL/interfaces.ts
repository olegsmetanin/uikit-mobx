import {IForm} from '../../../../../src'

export interface IHomeState {
  counter: number;
  counterChanging: boolean;
  list: IForm[];
  listIsLoading: boolean;
  listItems: IForm[];
}

export interface IHomeActions {
  incrementCounter: () => Promise<void>;
  decrementCounter: () => Promise<void>;
  loadList: () => Promise<void>;
  saveItem: (item) => Promise<void>;
}

export interface IHomeService {
  getList(): Promise<IForm[]>;
  saveItem(item): Promise<IForm>;
}

export default IHomeState;