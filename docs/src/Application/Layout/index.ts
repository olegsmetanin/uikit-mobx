import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router';
import Layout from './LayoutComponent';

const ConnectedLayout = inject('appStore')(withRouter(observer(Layout)));

export default ConnectedLayout;