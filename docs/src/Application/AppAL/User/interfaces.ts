export interface IUser {
  name: string;
  lang: string;
  permissions: any;
}

export interface IUserState {
  user: IUser;
  userIsLoaded: boolean;
  userError: any;
}

export interface IUserActions {
  getMe: () => Promise<void>;
}

export interface IUserService {
  getMe: () => Promise<IUser>;
}

