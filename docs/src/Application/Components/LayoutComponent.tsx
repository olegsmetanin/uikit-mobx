import * as React from 'react';

import {Container} from 'components';
import {Nav, ConfirmDialog} from './index';
import {IAppState} from '../AppAL/IAppState'

export interface ILayoutProps {
  appState: IAppState;
  route: any;
  router: any;
}

export class Layout extends React.Component<ILayoutProps, void> {

  render() {
    return (
      <Container
        width={this.props.appState.layoutWidth}
        onChangeWidth={(newLayoutWidth) => {this.props.appState.layoutWidth = newLayoutWidth}}
        className={'layout'}
      >
        <Nav route={this.props.route}/>
        {this.props.children}

        <ConfirmDialog/>

      </Container>
    )
  }
}

export default Layout;
