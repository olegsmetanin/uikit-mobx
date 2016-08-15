import {I18n} from '../../../utils/i18n/loadI18n'

export interface ISystem {
  rootPath: string;
  lang: string;
}

export interface ISystemState {
  system: ISystem;
  systemIsLoaded: boolean;
  i18n: I18n;
  //currentRoute: string;
}

export interface ISystemActions {
  getSystem: () => Promise<void>;
  loadLang: (lang) => Promise<void>;
  setLang: (lang) => Promise<void>;
  goto: (location: any) => Promise<void>;
}

export interface ISystemService {
  getSystem: () => Promise<ISystem>;
}

export default ISystemState;