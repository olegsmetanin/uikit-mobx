import IHTTPClient from './../utils/http/IHTTPClient';
import {ContainerWidth} from '../../../src';

export interface IAppStore {
  httpClient: IHTTPClient;
  rootPath:   string;
  layoutWidth: ContainerWidth;
  lang: string;
  isDirty: boolean;
}

export default IAppStore;