import {ISystemActions, ISystemState, ISystemService} from './interfaces'

export class SystemActions implements ISystemActions {

  constructor(state: ISystemState,
              service: ISystemService) {
    this.state = state;
    this.service = service;
  }

  state: ISystemState;
  service: ISystemService;

  getSystem = async () => {
    let system = await this.service.getSystem();
    this.state.system = system;
  }

}

export default SystemActions;