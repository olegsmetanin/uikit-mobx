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

export default IHomeState;