import IHTTPClient from '../../http/IHTTPClient'
import {IGenericDocumentService} from './IGenericDocumentService'

export abstract class GenericDocumentService<M, F, CR> implements IGenericDocumentService<M, F, CR> {

  constructor(httpClient: IHTTPClient, url: string) {
    this.httpClient = httpClient
    this.url = url
  }

  httpClient: IHTTPClient

  url: string

  get = async (id: string) => {

    const res = await this.httpClient.send({
      method: 'POST',
      url: this.url,
      data: JSON.stringify({id}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return res

  }

  update = async (value: M) => {

    const res = await this.httpClient.send({
      method: 'POST',
      url: this.url + '/update',
      data: JSON.stringify(value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return res

  }

  delete = async (id: string) => {

    await this.httpClient.send({
      method: 'POST',
      url: this.url + '/delete',
      data: JSON.stringify({id}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

  }

}
