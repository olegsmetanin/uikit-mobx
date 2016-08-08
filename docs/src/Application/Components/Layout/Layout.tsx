/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../../src';
import ConnectedNav from '../Nav';
import {IAppState} from '../../AppAL/interfaces'

const Layout = ({appState, children, route}: {appState: IAppState, children: React.ReactNode, route: any}) => (
    <Container
      width={appState.layoutWidth}
      onChangeWidth={(newLayoutWidth) => {appState.layoutWidth = newLayoutWidth}}
      className={'layout'}
    >
      <ConnectedNav route={route}/>
      {children}
    </Container>
);

export default Layout;
