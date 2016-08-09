import {observable} from 'mobx';
import {ContainerWidth} from '../../../../src'
import {IUser} from './User/interfaces'
import {IAppState} from './interfaces'
import {ISystem} from './System/interfaces'

export class AppState implements IAppState {

  constructor(state?: any) {
    if (state && state.user) {
      this.user = state.user;
    }
    if (state && state.layoutWidth) {
      this.layoutWidth = state.layoutWidth;
    }
    if (state && state.system) {
      this.system = state.system;
    }

  }

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg;

  @observable
  user: IUser;

  @observable
  system: ISystem;

}

export default AppState;
