import * as React from 'react';
import {IAppState} from '../AppAL/IAppState'

export interface IConfirmDialogProps {
  appState: IAppState
}

export class ConfirmDialog extends React.Component<IConfirmDialogProps, void> {

  onConfirm = () => {
    /* !!! https://github.com/mobxjs/mobx/issues/421 */
    this.props.appState.confirmDialog.onConfirm
    this.props.appState.confirmDialog = null
  }

  onCancel = () => {
    this.props.appState.confirmDialog = null
  }

  render() {
    const {appState} = this.props
    return appState.confirmDialog
      ? (
        <div>
          {appState.confirmDialog.body}
          <button onClick={this.onConfirm}>OK</button>
          <button onClick={this.onCancel}>Cancel</button>
        </div>
      )
      : null
  }
}

export default ConfirmDialog