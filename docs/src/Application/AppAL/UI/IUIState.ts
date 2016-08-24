import {ContainerWidth} from 'components'

export interface IUIState {
  layoutWidth: ContainerWidth
  confirmDialogBody: any
  confirmDialogOnConfirm: () => void
  confirmDialogOnCancel: () => void
  isDirty: boolean
}

export default IUIState;