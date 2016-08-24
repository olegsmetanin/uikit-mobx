import {IForm, IComplexFormValue} from 'components'

export interface IHomeService {
  getList(): Promise<IForm[]>
  saveItem(item): Promise<IForm>
  fetchComplexFormValue: () => Promise<IComplexFormValue>
  saveComplexFormValue: (value) => Promise<IComplexFormValue>
}

export default IHomeService