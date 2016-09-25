import {ISystemState} from './System/ISystemState'
import {IUserState} from './User/IUserState'

export interface IAppState extends IUserState, ISystemState {
}

export default IAppState
