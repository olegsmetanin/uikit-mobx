import {ICustomerService} from './ICustomerService'
import {delay} from 'generic'
import {ICustomer} from './View/ICustomer'
import * as _ from 'lodash'

let testCustomerList: ICustomer[] = [
  {
    id: '1',
    name: 'Customer1'
  },
  {
    id: '2',
    name: 'Customer2'
  }
]

export class CustomerMockService implements ICustomerService {

  path: string

  constructor(path: string) {
    this.path = path
  }

  get = async (id: string) => {
    return await delay(testCustomerList[0], 1000)
  }

  list = async (filter: any, page = 0) => {

    return await delay({value: testCustomerList, count: testCustomerList.length, page: page}, 1000)
  }

  lookup = async (text: string, page = 0) => {
    let filtred = _.filter(testCustomerList, (item) => true /*_.includes(item.name, text)*/)
      .map((item, i) => ({id: item.id, name: item.name, desc: item.name}))

    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }


}