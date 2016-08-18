import {I18n, IForm, IComplexFormValue} from 'components'

export interface IHomeState {
  i18n: I18n;
  counter: number;
  counterChanging: boolean;
  list: IForm[];
  listIsLoading: boolean;
  listItems: IForm[];
  complexFormValue: IComplexFormValue;
  complexFormValueIsLoading: boolean;
  complexFormValueIsSaving: boolean;
}

export default IHomeState;