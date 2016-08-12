/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {Container} from '../../../../src';
import Nav from './Nav';
import {IAppState} from '../AppAL/interfaces'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router'

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

const ConnectedLayout = inject('appState')(withRouter(observer(Layout)));

export default ConnectedLayout;
