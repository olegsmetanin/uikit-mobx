import {ICustomerService} from './ICustomerService'
import delay from '../../../generic/utils/delay'
import {ICustomer} from '../Model/ICustomer'

let testCustomerList: ICustomer[] = [
  {
    id: '1',
    name: 'Customer1',
  },
  {
    id: '2',
    name: 'Customer2',
  }
]

let testCustomerLookupList = testCustomerList

export class CustomerService implements ICustomerService {

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
    return await delay({value: testCustomerLookupList, count: testCustomerLookupList.length, page: page}, 1000)
  }


}