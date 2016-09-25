import * as React from 'react'

export const withProps = (mapToProps: (Object) => Object) => Component => {
  return class extends React.Component<any, any> {
    render() {
      const mappedProps = mapToProps(this.props)
      return <Component {...mappedProps} {...this.props}/>
    }
  }
}