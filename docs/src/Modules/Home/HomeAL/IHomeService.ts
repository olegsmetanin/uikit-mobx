import {IForm} from '../../../../../src/Form/Form'
import {IComplexFormData} from '../../../../../src/ComplexForm/ComplexForm'

export interface IHomeService {
  getList(): Promise<IForm[]>;
  saveItem(item): Promise<IForm>;
  fetchComplexFormData: () => Promise<IComplexFormData>;
}

export default IHomeService;