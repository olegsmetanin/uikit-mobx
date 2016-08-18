
import {ISystem} from './ISystem'
import {I18n} from 'components'

export interface ISystemState {
  system: ISystem;
  systemIsLoaded: boolean;
  i18n: I18n;
  // currentRoute: string;
}

export default ISystemState;