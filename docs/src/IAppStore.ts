import IHTTPClient from './utils/http/IHTTPClient';
import {ContainerWidth} from '../../src';

interface IAppStore {
  httpClient: IHTTPClient;
  rootPath:   string;
  layoutWidth: ContainerWidth;
}

export default IAppStore;