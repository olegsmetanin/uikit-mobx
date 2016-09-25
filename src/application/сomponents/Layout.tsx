/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {Container} from 'generic'
import {Nav} from './index'
import {IAppState} from '../AppAL/IAppState'

export const Layout = ({
    appState,
    children,
    route
  }: {
    appState: IAppState,
    children: React.ReactNode,
    route: any
  }) => (
    <Container
      width={appState.layoutWidth}
      onChangeWidth={(newLayoutWidth) => {appState.layoutWidth = newLayoutWidth}}
      className={'layout'}
    >
      <Nav route={route}/>
      {children}
    </Container>
)

export default Layout
