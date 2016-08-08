import {IUserState} from './User/interfaces'
import {IUIState} from './UI/interfaces'
import {ISystemState} from './System/interfaces'

export interface IAppState extends IUserState, IUIState, ISystemState {
}

export default IAppState;