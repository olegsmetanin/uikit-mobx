import {observable} from 'lib/Reactive'

import {I18n} from 'generic'
import {IHomeState} from './IHomeState'

export class HomeState implements IHomeState {

  @observable
  i18n: I18n

  @observable
  counter: number = 0

  @observable
  counterChanging: boolean = false

  @observable
  listIsLoading: boolean = false


}

export default HomeState