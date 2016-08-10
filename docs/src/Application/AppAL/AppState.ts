import {observable} from 'mobx';
import {ContainerWidth} from '../../../../src'
import {IUser} from './User/interfaces'
import {IAppState} from './interfaces'
import {ISystem} from './System/interfaces'
import {I18n} from '../../utils/i18n/loadI18n'

export class AppState implements IAppState {

  constructor(state?: any) {
    if (state && state.layoutWidth) {
      this.layoutWidth = state.layoutWidth;
    }
    if (state && state.user) {
      this.user = state.user;
      this.userIsLoaded = true;
    }
    if (state && state.system) {
      this.system = state.system;
      this.systemIsLoaded = true;
    }

  }

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg;

  @observable
  user: IUser;

  @observable
  userIsLoaded: boolean = false;

  @observable
  userError: any;

  @observable
  system: ISystem;

  @observable
  systemIsLoaded: boolean = false;

  @observable
  i18n: I18n;


}

export default AppState;