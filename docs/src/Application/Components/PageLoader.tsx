import * as React from 'react'

export const loadPage = (function () {
  let firstLoad = true
  return function (bundleLoader, args, pageResolver) {
    return (location, cb) => {
      if (typeof window !== 'undefined') {
        if (firstLoad) {
          firstLoad = false
          cb(null, pageLoaderComponent(bundleLoader, args, pageResolver))
        } else {
          bundleLoader(bundle => {
            bundle.default(args).then((module) => {
              cb(null, pageResolver(module))
            })
          })
        }
      } else {
        bundleLoader.default(args).then((module) => {
          cb(null, pageResolver(module))
        })
      }
    }
  }
})()

export const pageLoaderComponent = (bundleLoader: any, args: any, pageResolver: (any) => any) => {
  return class extends React.Component<any, {isLoaded: boolean, error: boolean}> {

    Component: any

    constructor(props, context) {
      super(props, context)

      this.state = {
        isLoaded: false,
        error: null
      }
    }

    componentDidMount() {
      this.loadPage()
    }

    loadPage = () => {
      if (typeof window !== 'undefined') {
        bundleLoader(bundle => {
          bundle.default(args)
          .then((module) => {
            this.Component = pageResolver(module)
            this.setState({isLoaded: true, error: false})
          })
          .catch((e) => {
            this.setState({isLoaded: false, error: true})
          })
        })
      } else {
        bundleLoader.default(args).then((module) => {
          this.Component = pageResolver(module)
          this.setState({isLoaded: true, error: false})
        })
      }
    }

    render() {
      const Component = this.Component
      if (this.state.isLoaded) {
        return <Component {...this.props}/>
      } else if (this.state.error) {
        return <button onClick={this.loadPage}>Retry</button>
      } else {
        return <div>PageLoading</div>
      }
    }
  }
}

export default loadPage