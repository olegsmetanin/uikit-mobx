import * as React from 'react';

import {Container} from 'components';
import {Nav} from './index';
import {IAppState} from '../AppAL'

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
      </Container>
    )
  }
}

export default Layout;
