import {observable} from 'mobx';
import IHTTPClient from './../utils/http/IHTTPClient';
import {ContainerWidth} from '../../../src';
import {IAppStore} from './IAppStore'

export class AppStore implements IAppStore {

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

  lang: string = 'de';

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg;

  @observable
  isDirty: boolean = false;

}

export default AppStore;