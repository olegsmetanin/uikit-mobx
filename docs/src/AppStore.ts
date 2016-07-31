import {observable} from 'mobx';
import IHTTPClient from './utils/http/IHTTPClient';
import {ContainerWidth} from '../../src';


export let appStore: IAppStore = null;

export interface IAppStore {
  httpClient: IHTTPClient;
  rootPath:   string;
  layoutWidth: ContainerWidth;
  lang: string;
}

export class AppStore {

  constructor({
    rootPath,
    httpClient,
    state
  }: {
    rootPath: string,
    httpClient: IHTTPClient,
    state?: any
  }) {
    this.rootPath = rootPath;
    this.httpClient = httpClient;
    if (state) {
      this.layoutWidth = state.layoutWidth;
    }
  }

  rootPath: string;

  httpClient: IHTTPClient;

  lang: string = 'en';

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg;

  serialize = () => {};

  deserialize = () => {};

}

export default AppStore;