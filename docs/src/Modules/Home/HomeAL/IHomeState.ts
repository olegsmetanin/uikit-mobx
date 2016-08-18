import {IForm, IComplexFormData} from 'components'
import {I18n} from '../../../utils/i18n/loadI18n'

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