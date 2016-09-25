import * as React from 'react'
import {rest} from 'generic/utils/rest'

export class ClickOutside extends React.Component<{except?: HTMLElement, onClickOutside: (e) => void}, void> {

  wrapper: HTMLElement

  componentDidMount() {
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true)
  }

  handle = (e) => {
    const {onClickOutside} = this.props
    if (onClickOutside) {
      const el = this.wrapper
      const except = this.props.except
      if (!el.contains(e.target) && !(except && except.contains(e.target))) {
        onClickOutside(e)
      }
    }
  }

  render() {
    const {children, onClickOutside} = this.props
    const props = rest(this.props, [children, onClickOutside])
    return <div {...props} ref={(el) => this.wrapper = el}>{children}</div>
  }

}
