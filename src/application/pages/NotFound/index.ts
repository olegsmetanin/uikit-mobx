import {observer} from 'lib/Reactive'
import {withRouter} from 'lib/Router'
import {NotFoundPage as BaseNotFoundPage} from './NotFoundPage'

const NotFoundPage = withRouter(observer(BaseNotFoundPage))

export default NotFoundPage