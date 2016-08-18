import {IForm, IComplexFormData} from 'components'

export interface IHomeService {
  getList(): Promise<IForm[]>;
  saveItem(item): Promise<IForm>;
  fetchComplexFormData: () => Promise<IComplexFormData>;
}

export default IHomeService;