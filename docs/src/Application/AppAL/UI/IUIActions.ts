import {IConfirmDialog} from 'components/api/IConfirmDialog'
export interface IUIActions {
  showConfirmDialog: (confirmDialog: IConfirmDialog) => Promise<void>;
}

export default IUIActions;