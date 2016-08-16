import delay from '../../../utils/Promise/delay'
import IHTTPClient from '../../../utils/http/IHTTPClient'
import {ISystemService} from './ISystemService'

export class SystemService implements ISystemService {

  constructor(httpClient: IHTTPClient) {
    this.httpClient = httpClient;
  }

  httpClient: IHTTPClient;

  getSystem = async () => {
    let res = await delay({
        rootPath: '',
        lang: 'en'
      },
      1000);
    return res;
  };

}

export default SystemService;