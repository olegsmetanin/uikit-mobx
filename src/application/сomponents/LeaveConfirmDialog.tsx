/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {IAppState} from '../AppAL/IAppState'

export const LeaveConfirmDialog = ({
  appState
}: {
  appState: IAppState,
}) => (
  <div>
    {appState.i18n('app:leaveConfirmDialog')}
  </div>
)