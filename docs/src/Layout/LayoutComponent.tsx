/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observer, inject} from "mobx-react";
import {Container, ContainerWidth} from '../../../src';
import IAppStore from '../IAppStore';

interface ILayoutProps extends React.Props<Layout> {
  appStore: IAppStore;
}

@inject('appStore')
@observer
class Layout extends React.Component<ILayoutProps, void> {

  render() {
    return (
      <Container
        width={this.props.appStore.layoutWidth}
        onChangeWidth={(newLayoutWidth) => {this.props.appStore.layoutWidth = newLayoutWidth}}
        className={'layout'}
      >
        {this.props.children}
      </Container>
    )
  }
}

export default Layout;
