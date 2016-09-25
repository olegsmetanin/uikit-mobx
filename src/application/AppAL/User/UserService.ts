import {delay} from 'generic'
import {IUserService} from './IUserService'
import {IHTTPClient} from 'generic'

export class UserService implements IUserService {

  constructor(httpClient: IHTTPClient) {
    this.httpClient = httpClient
  }

  httpClient: IHTTPClient

  getMe = async () => {
    // if (Math.random() > 0.5) {
    //   throw new Error('qwe')
    // }

    let res = await delay(
      {
        name: 'user',
        lang: 'en',
        permissions: {v: 1}
      },
      1000
    )

    return res
  }

}

export default UserService