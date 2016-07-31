/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../src';
import {IAppStore} from '../../AppStore';
import ConnectedNav from '../Nav';

const Layout = ({appStore, children, route}: {appStore: IAppStore, children: React.ReactNode, route: any}) => (
    <Container
      width={appStore.layoutWidth}
      onChangeWidth={(newLayoutWidth) => {appStore.layoutWidth = newLayoutWidth}}
      className={'layout'}
    >
      <ConnectedNav route={route}/>
      {children}
    </Container>
);

export default Layout;
