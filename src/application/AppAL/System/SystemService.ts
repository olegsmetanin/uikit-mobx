import {delay} from 'generic'
import {IHTTPClient} from 'generic'
import {ISystemService} from './ISystemService'

export class SystemService implements ISystemService {

  constructor(httpClient: IHTTPClient) {
    this.httpClient = httpClient
  }

  httpClient: IHTTPClient

  getSystem = async () => {
    let res = await delay({
        rootPath: '',
        lang: 'en'
      },
      1000)
    return res
  }

}

export default SystemService