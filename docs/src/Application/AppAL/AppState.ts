import {observable} from 'mobx';
import {ContainerWidth} from '../../../../src'
import {IUser} from './User/interfaces'
import {IAppState} from './interfaces'

export class AppState implements IAppState {

  constructor(state?: any) {
    if (state && state.user) {
      this.user = state.user;
    }
    if (state && state.layoutWidth) {
      this.layoutWidth = state.layoutWidth;
    }
  }

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg;

  @observable
  user: IUser;

  rootPath: string;

}

export default AppState;
