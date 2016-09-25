import {IUser} from './IUser'

export interface IUserState {
  user: IUser
  userIsLoaded: boolean
  userError: any
}

export default IUserState