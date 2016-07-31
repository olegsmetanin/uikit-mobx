import {observer} from 'mobx-react';
import {withRouter} from 'react-router';
import Nav from './Nav';

const ConnectedNav = withRouter(observer(Nav));

export default ConnectedNav;