/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../src';
import Nav from './Nav';
import {IAppState} from '../AppAL/interfaces'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router'

export const Layout = ({appState, children, route}: {appState: IAppState, children: React.ReactNode, route: any}) => (
    <Container
      width={appState.layoutWidth}
      onChangeWidth={(newLayoutWidth) => {appState.layoutWidth = newLayoutWidth}}
      className={'layout'}
    >
      <Nav route={route}/>
      {children}
    </Container>
);

const ConnectedLayout = inject('appState')(withRouter(observer(Layout)));

export default ConnectedLayout;
