import {I18n} from '../../../utils/i18n/loadI18n'
import {ISystem} from './ISystem'

export interface ISystemState {
  system: ISystem;
  systemIsLoaded: boolean;
  i18n: I18n;
  // currentRoute: string;
}

export default ISystemState;