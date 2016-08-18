import {ContainerWidth} from 'components'
import {IConfirmDialog} from '../../../../../src/components/api/IConfirmDialog'

export interface IUIState {
  layoutWidth: ContainerWidth
  confirmDialog: IConfirmDialog
}

export default IUIState;