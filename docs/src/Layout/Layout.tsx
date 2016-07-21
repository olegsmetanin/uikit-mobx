/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observer, inject} from 'mobx-react';
import {Container, ContainerWidth} from '../../../src';
import IAppStore from '../IAppStore';

const Layout = inject('appStore')(observer(
  ({appStore, children}: {appStore: IAppStore, children: React.ReactNode}) => (
    <Container
      width={appStore.layoutWidth}
      onChangeWidth={(newLayoutWidth) => {appStore.layoutWidth = newLayoutWidth}}
      className={'layout'}
    >
      {children}
    </Container>
  )
))

export default Layout;
