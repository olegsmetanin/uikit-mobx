/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {I18n} from 'generic'

export const ConfirmDialog = ({
  children,
  onConfirm,
  hideDialog,
  Dialog,
  i18n
}: {
  children?: any
  onConfirm: () => void
  hideDialog: () => void
  Dialog: any
  i18n: I18n
}) => {
  return (
    <Dialog>
      {children}
      <button
        onClick={() => {
        hideDialog()
        onConfirm()
      }}
      >
        {i18n('System:ConfirmDialog:Ok')}
      </button>
      <button
        onClick={() => {
        hideDialog()
      }}
      >
        {i18n('System:ConfirmDialog:Cancel')}
      </button>
    </Dialog>
  )
}

export default ConfirmDialog
