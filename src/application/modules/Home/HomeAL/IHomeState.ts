import {I18n} from 'generic'

export interface IHomeState {
  i18n: I18n
  counter: number
  counterChanging: boolean
  listIsLoading: boolean
}

export default IHomeState