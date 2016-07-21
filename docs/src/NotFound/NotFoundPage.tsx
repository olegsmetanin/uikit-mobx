/// <reference path="../docs.d.ts" />

import * as React from 'react';


/**
 * 404 page for not existing routes
 */
class NotFoundPage extends React.Component<void, void> {

  // Used is server side rendering, for 404 status code
  static isNotFound = true;

  render() {
    return (
      <div>
        404 Not Found
      </div>
    );
  }

}

export default NotFoundPage;
