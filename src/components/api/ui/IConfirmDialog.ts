export interface IConfirmDialog {
  body: any
  onConfirm: () => void
  onCancel?: () => void
}

export default IConfirmDialog