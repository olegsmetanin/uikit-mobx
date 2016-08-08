/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../../src';
import ConnectedNav from '../Nav';
import {IAppState} from '../../AppAL/interfaces'

export interface ILayoutProps {
  appState: IAppState;
  route: any;
  router: any;
}

class Layout extends React.Component<ILayoutProps, void> {

  render() {
    return (
      <Container
        width={this.props.appState.layoutWidth}
        onChangeWidth={(newLayoutWidth) => {this.props.appState.layoutWidth = newLayoutWidth}}
        className={'layout'}
      >
        <ConnectedNav route={this.props.route}/>
        {this.props.children}
      </Container>
    )
  }
}

export default Layout;
