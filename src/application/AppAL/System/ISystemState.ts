import {ISystem} from './ISystem'
import {I18n, ContainerWidth} from 'generic'

export interface ISystemState {
  system: ISystem
  systemIsLoaded: boolean
  i18n: I18n
  layoutWidth: ContainerWidth
  confirmDialogBody: any
  confirmDialogOnConfirm: () => void
  confirmDialogOnCancel: () => void
  dialog: any
  isDirty: boolean
}

export default ISystemState