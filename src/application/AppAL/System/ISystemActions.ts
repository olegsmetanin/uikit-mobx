import {ContainerWidth} from 'generic'

export interface ISystemActions {
  getSystem: () => Promise<void>
  loadLang: (lang) => Promise<void>
  setLang: (lang) => Promise<void>
  goto: (location: any) => Promise<void>
  setDirty: (isDirty: boolean) => void
  showDialog: (dialog: any) => void
  hideDialog: () => void
  setLayoutWidth: (layoutWidth: ContainerWidth) => void
  testAction: () => void
}

export default ISystemActions