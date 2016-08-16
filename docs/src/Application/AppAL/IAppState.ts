import {IUserState} from './User'
import {IUIState} from './UI'
import {ISystemState} from './System'

export interface IAppState extends IUserState, IUIState, ISystemState {
}

export default IAppState;