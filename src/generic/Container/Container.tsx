import * as React from 'react'

/**
 * Screen size types
 * @see {Layout.calculateWidth}
 */
export enum ContainerWidth {
  xx,
  xs,
  sm,
  md,
  lg
}

export interface IContainerProps {
  width:   ContainerWidth
  onChangeWidth: (width: ContainerWidth) => void
  className?: string
}


/**
 * Main layout for all pages. Support width tracking
 */
export class Container extends React.Component<IContainerProps, void> {

  _container: HTMLDivElement

  componentDidMount = () => {
    this.handleResize()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount = () => {
    // If SSR, window may be not available
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  handleResize = () => {
    // If SSR, document may be not available (used in calculateWidth)
    if (typeof window !== 'undefined') {
      const currentWidth = this.props.width
      const width = this.calculateWidth()
      if (width !== currentWidth) {
        this.props.onChangeWidth(width)
      }
    }
  }

  calculateWidth = () => {
    const w = this._container.clientWidth
    return w < 415
      ? ContainerWidth.xx // Apple iPhone 6 plus = 414, Google Nexus 6 = 412
      : w < 768
      ? ContainerWidth.xs // Google Nexus 7 = 600
      : w < 992
      ? ContainerWidth.sm // Apple iPad (Mini) portrait = 768
      : w < 1200
      ? ContainerWidth.md // Apple iPad (Mini) landscape = 1024
      : ContainerWidth.lg // Desktop
  }

  render() {
    const {width = ContainerWidth.lg} = this.props
    return (
      <div ref={(r) => this._container = r} className={`${ContainerWidth[width]}`}>
          {this.props.children}
      </div>
    )
  }
}

