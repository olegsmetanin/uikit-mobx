import {IForm} from '../../../../../src'
import {I18n} from '../../../utils/i18n/loadI18n'

export interface IHomeState {
  i18n: I18n;
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