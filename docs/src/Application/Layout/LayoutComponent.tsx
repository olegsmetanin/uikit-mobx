/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../src';
import {IAppStore} from '../IAppStore';
import ConnectedNav from '../Nav';

export interface ILayoutProps {
  appStore: IAppStore;
  route: any;
  router: any;
}

class Layout extends React.Component<ILayoutProps, void> {

  render() {
    return (
      <Container
        width={this.props.appStore.layoutWidth}
        onChangeWidth={(newLayoutWidth) => {this.props.appStore.layoutWidth = newLayoutWidth}}
        className={'layout'}
      >
        <ConnectedNav route={this.props.route}/>
        {this.props.children}
      </Container>
    )
  }
}

export default Layout;
