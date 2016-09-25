import {IUser} from './IUser'

export interface IUserService {
  getMe: () => Promise<IUser>
}

export default IUserService


