import {inject, observer} from '../../lib/Reactive'
import {withRouter} from '../../lib/Router'

import {Layout as BaseLayout} from './LayoutComponent'
import {Nav as BaseNav} from './Nav'
import {ConfirmDialog as BaseConfirmDialog} from './ConfirmDialog'
import {LeaveConfirmDialog as BaseLeaveConfirmDialog} from './LeaveConfirmDialog'

const ConfirmDialog = inject('appState', 'uiActions')(observer(BaseConfirmDialog))

const LeaveConfirmDialog = inject('appState')(observer(BaseLeaveConfirmDialog))

const Layout = inject('appState')(withRouter(observer(BaseLayout)))

const Nav = withRouter(observer(BaseNav))

export {
  Layout,
  Nav,
  ConfirmDialog,
  LeaveConfirmDialog
}
