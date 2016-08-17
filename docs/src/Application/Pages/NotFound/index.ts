import {observer} from 'lib/Reactive';
import {withRouter} from 'lib/Router';
import NotFoundPage from './NotFoundPage';

const ConnectedNotFoundPage = withRouter(observer(NotFoundPage));

export default ConnectedNotFoundPage;