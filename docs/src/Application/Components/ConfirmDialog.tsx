import * as React from 'react';
import {IAppState} from '../AppAL/IAppState'
import {IUIActions} from '../AppAL/UI/IUIActions'

export interface IConfirmDialogProps {
  appState: IAppState
  uiActions: IUIActions
}

export class ConfirmDialog extends React.Component<IConfirmDialogProps, void> {

  onConfirm = () => {
    this.props.uiActions.hideConfirmDialog(true)
  }

  onCancel = () => {
    this.props.uiActions.hideConfirmDialog(false)
  }

  render() {
    const {appState} = this.props
    return appState.confirmDialogBody
      ? (
        <div>
          {appState.confirmDialogBody}
          <button onClick={this.onConfirm}>OK</button>
          <button onClick={this.onCancel}>Cancel</button>
        </div>
      )
      : null
  }
}

export default ConfirmDialog