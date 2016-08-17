import {inject, observer} from 'lib/Reactive'
import {withRouter} from 'lib/Router'

import {Layout as BaseLayout} from './LayoutComponent'
import {Nav as BaseNav} from './Nav'

const Layout = inject('appState')(withRouter(observer(BaseLayout)))

const Nav = withRouter(observer(BaseNav))

export {
  Layout,
  Nav
}
