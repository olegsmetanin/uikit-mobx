import IHTTPClient from '../../../utils/http/IHTTPClient'
export interface ISystemState {
  rootPath:   string;
}

export interface ISystem {
  httpClient: IHTTPClient;
}

export default ISystemState;