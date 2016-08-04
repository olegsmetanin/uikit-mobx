import {observer} from 'mobx-react';
import {withRouter} from 'react-router';
import NotFoundPage from './NotFoundPage';

const ConnectedNotFoundPage = withRouter(observer(NotFoundPage));

export default ConnectedNotFoundPage;