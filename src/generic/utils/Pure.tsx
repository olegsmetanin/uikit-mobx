import * as React from 'react'
const PureRenderMixin = require('react-addons-pure-render-mixin')

// console.log('PureRenderMixin', PureRenderMixin)
export const Pure = ComposedComponent => class PureHOC extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context)
  }
  shouldComponentUpdate() {
    // console.log('Pure shouldComponentUpdate')
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
  }

  render() {
    // console.log('Pure render')
    return <ComposedComponent {...this.props}/>
  }
}