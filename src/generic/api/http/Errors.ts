export class HTTPError extends Error {
  constructor(status: number, msg: string) {
    super(msg)
    this.message = msg
    this.status = status
  }

  status: number
}

export class ConnectionBrokenError extends HTTPError {
  constructor() {
    super(0, 'Connection to server broken')
  }
}

export class AuthenticationRequiredError extends HTTPError {
  constructor(data?: {[prop: string]: any}) {
    super(401, 'Authentication required')

    Object.assign(this, data)
  }
}
