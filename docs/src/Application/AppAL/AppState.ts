import {observable} from '../../lib/Reactive';
import {I18n, ContainerWidth, IConfirmDialog} from 'components'
import {IAppState} from './IAppState'
import {IUser} from './User/IUser'
import {ISystem} from './System/ISystem'

export class AppState implements IAppState {

  constructor(state?: any) {
    if (state && state.layoutWidth) {
      this.layoutWidth = state.layoutWidth
    }
    if (state && state.user) {
      this.user = state.user
      this.userIsLoaded = true
    }
    if (state && state.system) {
      this.system = state.system
      this.systemIsLoaded = true
    }

  }

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg

  @observable
  user: IUser

  @observable
  userIsLoaded: boolean = false

  @observable
  userError: any

  @observable
  system: ISystem

  @observable
  systemIsLoaded: boolean = false

  @observable
  i18n: I18n

  @observable
  confirmDialog: IConfirmDialog = null

}

export default AppState
