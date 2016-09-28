import {IOrderService} from './IOrderService'
import {delay} from 'generic/utils/delay'
import {IOrder} from './View/IOrder'
import {IOrderCreateRequest} from './Create/IOrderCreateRequest'
import * as _ from 'lodash'

let testOrderList: IOrder[] = [
    {
      id: '0',
      customer: {id: '1', name: 'Customer1'},
      customer1: {id: '1', name: 'Customer1'},
      name: 'SomeOrder',
      price: 1
    },
    {
      id: '1',
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

  create = async (createRequest: IOrderCreateRequest) => {
    let newValue: IOrder = _.assign(
      createRequest,
      {id: testOrderList.length}
    ) as IOrder
    testOrderList.push(newValue)
    return await delay(newValue, 1000)
  }

  get = async (id: string) => {
    let value = _.find(testOrderList, {id});
    return await delay(value, 1000)
  }

  update = async (value: IOrder) => {
    const i = _.findIndex(testOrderList, {id: value.id})
    testOrderList[i] = value
    return await delay(value, 1000)
  }

  delete = async (id: string) => {
    _.remove(testOrderList, {id: id});
    return await delay(null, 1000)
  }

  list = async (filter: any, page = 0) => {
    let filtred = _.filter(testOrderList, filter)
    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }

  lookup = async (text: string, page = 0) => {
    let filtred = _.filter(testOrderList, {name: text})
      .map((item, i) => ({id: item.id, name: item.name}))

    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }


}