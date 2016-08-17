/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../src';
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
