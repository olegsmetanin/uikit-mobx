import * as React from 'react'

import {Container, ContainerWidth} from 'generic'
import {Nav} from './index'

export interface ILayoutProps {
  setlayoutWidth: (layoutWidth: ContainerWidth) => void
  layoutWidth: ContainerWidth
  dialog: any
  route: any
  router: any
}

export class Layout extends React.Component<ILayoutProps, void> {

  render() {
    let {route, layoutWidth, setlayoutWidth, dialog, children} = this.props
    return (
      <Container
        width={layoutWidth}
        onChangeWidth={(newLayoutWidth) => {setlayoutWidth(newLayoutWidth)}}
        className={'layout'}
      >
        <Nav route={route}/>
        {children}

        {dialog}

      </Container>
    )
  }
}

export default Layout
