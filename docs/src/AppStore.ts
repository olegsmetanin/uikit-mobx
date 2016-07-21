import IHTTPClient from './utils/http/IHTTPClient';
import {ContainerWidth} from '../../src';
import {observable} from 'mobx';

export default class AppStore {

  constructor({
    rootPath,
    httpClient
  }: {
    rootPath: string,
    httpClient: IHTTPClient
  }) {
    this.rootPath = rootPath;
    this.httpClient = httpClient;
  }

  rootPath: string;

  httpClient: IHTTPClient;

  @observable
  layoutWidth: ContainerWidth = ContainerWidth.lg;

  serialize = () => {};

  deserialize = () => {};

}