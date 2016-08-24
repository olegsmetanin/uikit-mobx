import {IConfirmDialog} from '../../../../../src/components/api/ui/IConfirmDialog'
export interface IUIActions {
  showConfirmDialog: (confirmDialog: IConfirmDialog) => void
  hideConfirmDialog: (confirmed: boolean) => void
  setDirty: (isDirty: boolean) => void
}

export default IUIActions