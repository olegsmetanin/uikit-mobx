import {IUIState} from './IUIState'
import {IConfirmDialog} from '../../../../../src/components/api/ui/IConfirmDialog'
import {IUIActions} from './IUIActions'

export class UIActions implements IUIActions {

  constructor(state: IUIState, history: any) {
    this.state = state
    this.history = history
  }

  history: any

  state: IUIState

  showConfirmDialog = (confirmDialog: IConfirmDialog) => {
    this.state.confirmDialogBody = confirmDialog.body

    this.state.confirmDialogOnConfirm = confirmDialog.onConfirm
      ? () => {
        this.state.confirmDialogBody = null
        confirmDialog.onConfirm()
      }
      : null

    this.state.confirmDialogOnCancel = confirmDialog.onCancel
      ? () => {
      this.state.confirmDialogBody = null
      confirmDialog.onCancel()
      }
      : null
  }

  hideConfirmDialog = (confirmed: boolean) => {
    this.state.confirmDialogBody = null
    if (confirmed) {
      this.state.confirmDialogOnConfirm()
    } else {
      this.state.confirmDialogOnCancel()
    }
    this.state.confirmDialogOnConfirm = null
    this.state.confirmDialogOnCancel = null
  }

  setDirty = (isDirty: boolean) => {
    console.log('setDirty', isDirty)
    this.state.isDirty = isDirty
  }

}

export default UIActions