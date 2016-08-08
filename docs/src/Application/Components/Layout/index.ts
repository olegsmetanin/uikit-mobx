import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router';
import Layout from './LayoutComponent';

const ConnectedLayout = inject('appState')(withRouter(observer(Layout)));

export default ConnectedLayout;