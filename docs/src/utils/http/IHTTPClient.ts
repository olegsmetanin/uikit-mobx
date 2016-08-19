/**
 * Http request data
 */
export interface IHTTPRequest {
  method:  string
  url:     string
  data:    any
  headers: any
}

/**
 * XHR wrapper with error handling
 */
interface IHTTPClient {
  send(request: IHTTPRequest): Promise<any>
}

export default IHTTPClient
