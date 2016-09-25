
export interface IUserActions {
  getMe: () => Promise<void>
  setPermissions: (permissions: any) => Promise<void>
}

export default IUserActions
