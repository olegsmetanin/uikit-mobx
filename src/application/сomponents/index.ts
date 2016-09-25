import {inject, observer, injectAll} from 'lib/Reactive'
import {withRouter} from 'lib/Router'

import {Layout as BaseLayout} from './LayoutComponent'
import {Nav as BaseNav} from './Nav'
import {ConfirmDialog as BaseConfirmDialog} from './ConfirmDialog'
import {Dialog as BaseDialog} from './Dialog'
import {withProps} from 'generic'
export * from './PageLoader'


const Dialog = BaseDialog

const ConfirmDialog = injectAll(
  observer(
    withProps((statesAndActions) => ({
        i18n: statesAndActions.appState.i18n,
        hideDialog: statesAndActions.systemActions.hideDialog,
        Dialog: Dialog
    }))(
      BaseConfirmDialog
    )
  )
)

const Layout = injectAll(
  withRouter(
    observer(
      withProps((statesAndActions) => {
        return ({
          layoutWidth: statesAndActions.appState.layoutWidth,
          setlayoutWidth: statesAndActions.systemActions.setLayoutWidth,
          dialog: statesAndActions.appState.dialog
        })
      })(
        BaseLayout
      )
    )
  )
)

const Nav = inject((statesAndActions) => ({
  systemActions: statesAndActions.systemActions,
  user: statesAndActions.appState.user,
  userActions: statesAndActions.userActions
}))(withRouter(observer(BaseNav)))

export {
  Layout,
  Nav,
  ConfirmDialog,
  Dialog,
}
