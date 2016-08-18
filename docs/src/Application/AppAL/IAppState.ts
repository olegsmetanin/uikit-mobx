import {ISystemState} from './System/ISystemState'
import {IUserState} from './User/IUserState'
import {IUIState} from './UI/IUIState'

export interface IAppState extends IUserState, IUIState, ISystemState {
}

export default IAppState;