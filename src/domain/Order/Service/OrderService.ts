import {IOrderService} from './IOrderService'
import delay from '../../../generic/utils/delay'
import {IOrder} from '../Model/IOrder'

let testOrderList: IOrder[] = [
    {
      id: '1',
      customer: {id: '1', name: 'Customer1'},
      customer1: {id: '1', name: 'Customer1'},
      name: 'SomeOrder',
      price: 1
    },
    {
      id: '2',
      customer: {id: '2', name: 'Customer2'},
      customer1: {id: '2', name: 'Customer2'},
      name: 'SomeOrder2',
      price: 2
    }
  ]

export class OrderService implements IOrderService {

  path: string

  constructor(path: string) {
    this.path = path
  }

  get = async (id: string) => {
    return await delay(testOrderList[id], 1000)
  }

  list = async (filter: any, page = 0) => {

    return await delay({value: testOrderList, count: testOrderList.length, page: page}, 1000)
  }

  lookup = async (text: string, page = 0) => {
    return await delay({value: [{id: 'qwe1', name: 'qwe1'}], count: 1, page: page}, 1000)
  }


}