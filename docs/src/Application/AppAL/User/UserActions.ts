import {IUserActions, IUserState, IUserService} from './interfaces'

export class UserActions implements IUserActions {

  constructor(state: IUserState,
              service: IUserService) {
    this.state = state;
    this.service = service;
  }

  state: IUserState;
  service: IUserService;

  getMe = async () => {
    let user = await this.service.getMe();
    this.state.user = user;
  }

}

export default UserActions;