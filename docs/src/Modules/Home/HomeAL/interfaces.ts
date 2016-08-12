import {IForm} from '../../../../../src'
import {I18n} from '../../../utils/i18n/loadI18n'
import {IComplexFormData} from '../../../../../src/ComplexForm/ComplexForm'

export interface IHomeState {
  i18n: I18n;
  counter: number;
  counterChanging: boolean;
  list: IForm[];
  listIsLoading: boolean;
  listItems: IForm[];
  complexFormData: IComplexFormData;
  complexFormDataIsLoading: boolean;
}

export interface IHomeActions {
  incrementCounter: () => Promise<void>;
  decrementCounter: () => Promise<void>;
  loadList: () => Promise<void>;
  saveItem: (item) => Promise<void>;
  loadComplexFormData: () => Promise<void>;
}

export interface IHomeService {
  getList(): Promise<IForm[]>;
  saveItem(item): Promise<IForm>;
  fetchComplexFormData: () => Promise<IComplexFormData>;
}

export default IHomeState;