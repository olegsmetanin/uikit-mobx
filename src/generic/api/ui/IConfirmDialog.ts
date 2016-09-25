import * as React from 'react'

export interface IConfirmDialogProps {
  onConfirm: any
}

export type IConfirmDialog = React.ComponentClass<IConfirmDialogProps> | React.ClassicComponentClass<IConfirmDialogProps>
// error TS2604: JSX element type 'ConfirmDialog' does not have any construct or call signatures.
// | React.StatelessComponent<IConfirmDialogProps>


export default IConfirmDialog