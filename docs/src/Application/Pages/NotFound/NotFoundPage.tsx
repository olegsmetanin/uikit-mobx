import * as React from 'react'

/**
 * 404 page for not existing routes
 */
export class NotFoundPage extends React.Component<void, void> {

  // Used in server side rendering, for 404 status code
  static isNotFound = true

  render() {
    return (
      <div>
        404 Not Found
      </div>
    )
  }

}

export default NotFoundPage
