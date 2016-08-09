/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {IModule} from '../../../Modules/Home/IModule'
const pageLoader = (bundleLoader: any, args: any, pageResolver: (module: IModule) => any) => {
  return class extends React.Component<any, {isLoaded: boolean, error: boolean}> {
    Component: any;

    constructor(props, context) {
      super(props, context);
      this.state = {
        isLoaded: false,
        error: null
      }
    }

    componentDidMount() {
      this.loadPage();
    }

    loadPage = () => {
      if (typeof window !== 'undefined') {
        bundleLoader(modulePromise => {
          modulePromise.default(args)
          .then((module) => {
            this.Component = pageResolver(module);
            this.setState({isLoaded: true, error: false});
          })
          .catch((e) => {
            this.setState({isLoaded: true, error: true});
          });
        })
      } else {
        bundleLoader.default(args).then((module) => {
          this.Component = pageResolver(module);
          this.setState({isLoaded: true, error: false});
        });
      }
    };

    render() {
      const Component = this.Component;
      if (this.state.isLoaded) {
        return <Component {...this.props}/>
      } else if (this.state.error) {
        return <button onClick={this.loadPage}>Retry</button>
      } else {
        return <div>PageLoading</div>
      }
    }
  }
};

export default pageLoader;