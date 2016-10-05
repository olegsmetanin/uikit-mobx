import IHTTPClient, {IHTTPRequest} from './IHTTPClient'
import {HTTPError, AuthenticationRequiredError, ConnectionBrokenError} from './Errors'

require('whatwg-fetch')
const fetch = window['fetch']

export class HTTPClient implements IHTTPClient {

  send(request: IHTTPRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(request.url, {
        method: request.method,
        headers: request.headers,
        credentials: 'same-origin',
        body: request.data && JSON.stringify(request.data)
      }).then(response => {

        if (response.ok) {
          this.tryExtractJson(response).then(resolve)
        } else {
          if (response.status === 401) {
            this.tryExtractJson(response).then(json => {
              reject(new AuthenticationRequiredError(json))
            })
          } else if (response.status === 400) {
            // new APIError extends HTTPError?
            this.tryExtractJson(response).then(reject)
          } else {
            // FIXME custom error shape with response or extracted info?
            // new APIError extends HTTPError?
            this.tryExtractJson(response).then(json => {
              let httpErr = new HTTPError(response.status, response.statusText)
              if (Object.keys(json)) {
                httpErr = Object.assign(httpErr, json)
              }
              reject(httpErr)
            })
            // reject(new HTTPError(response.status, response.statusText))
            // reject(response)
          }
        }
      }, () => {
        reject(new ConnectionBrokenError())
      })
    })
  }

  tryExtractJson(response) {
    return new Promise((resolve) => {
      // First check content-type
      if (response.headers.has('Content-Type') && !/\/json/g.test(response.headers.get('Content-Type'))) {
        resolve()
        return
      }

      // Sometimes rest's don't send content-length (WTF?), so, first check for header presence
      const contentLength = response.headers.has('Content-Length') ?
        parseInt(response.headers.get('Content-Length'), 10) : null
      if (contentLength || contentLength > 0) {
        // and second check is here some text to parse (clone, because body may be read only once)
        const tester = response.clone()
        tester.text().then(text => {
          if (!text || text.length <= 0) {
            resolve() // empty response
          } else {
            response.json().then(resolve, (e) => {
              console.warn('Incorrect attempt to parse json from response', e)
              resolve()
            })
          }
        })
      } else {
        resolve()
      }
    })
  }

}

export default HTTPClient
