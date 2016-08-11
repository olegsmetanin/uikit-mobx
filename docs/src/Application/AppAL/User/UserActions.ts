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
    try {
      let user = await this.service.getMe();
      this.state.user = user;
      this.state.userIsLoaded = true;
    } catch (e) {
      this.state.userError = e;
      this.state.userIsLoaded = false;
    }
  }

}

export default UserActions;