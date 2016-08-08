import delay from '../../../utils/Promise/delay'
import {IUserService} from './interfaces'
import IHTTPClient from '../../../utils/http/IHTTPClient'

export class UserService implements IUserService {

  constructor(httpClient: IHTTPClient) {
    this.httpClient = httpClient;
  }

  httpClient: IHTTPClient;

  getMe = async () => {
    let res = await delay({
        name: 'user',
        lang: 'en'
      },
      1000);
    return res;
  };

}

export default UserService;