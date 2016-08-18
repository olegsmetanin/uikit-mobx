import {IUIState} from './IUIState'
import {IConfirmDialog} from '../../../../../src/components/api/IConfirmDialog'
import {IUIActions} from './IUIActions'

export class UIActions implements IUIActions {

  constructor(state: IUIState) {
    this.state = state
  }

  state: IUIState

  showConfirmDialog = async (confirmDialog: IConfirmDialog) => {
    this.state.confirmDialog = confirmDialog
  }

}

export default UIActions