import {ISystemActions, ISystemState, ISystemService} from './interfaces'
import {loadI18n} from '../../../utils/i18n/loadI18n'

export class SystemActions implements ISystemActions {

  constructor(state: ISystemState,
              service: ISystemService) {
    this.state = state;
    this.service = service;
  }

  state: ISystemState;
  service: ISystemService;

  getSystem = async () => {
    let system = await this.service.getSystem();
    this.state.system = system;
    this.state.systemIsLoaded = true;
  };

  loadLang = async (_lang: string) => {
    const lang = ['en', 'de'].indexOf(_lang) !== -1 ? _lang : 'en';
    this.state.i18n = await loadI18n(require(`bundle?lazy!./../../i18n/i18n.${lang}.json`));
  };

  setLang = async (lang: string) => {
    this.state.system.lang = lang;
  }

}

export default SystemActions;