import {ISystem} from './interfaces'
import IHTTPClient from '../../../utils/http/IHTTPClient'

export class System implements ISystem {

  constructor(httpClient: IHTTPClient) {
    this.httpClient = httpClient;
  }

  httpClient: IHTTPClient;

}

export default System;