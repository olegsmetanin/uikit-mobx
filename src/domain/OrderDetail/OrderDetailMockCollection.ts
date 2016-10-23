import {IEntityCollection} from '../api/IEntityCollection'
import {delay} from 'generic'
import {IOrderDetail} from './IOrderDetail'
import * as _ from 'lodash'
import {HTTPError} from 'generic'
import {IEventBus} from 'generic'

let source: IOrderDetail[] = [
    {
      id: '0',
      product: {id: '0', name: 'Product0', desc: 'Product0'},
      quantity: 1,
      price: 1
    },
    {
      id: '1',
      product: {id: '1', name: 'Product1', desc: 'Product1'},
      quantity: 1,
      price: 2
    }
  ]

let cache: IOrderDetail[] = []

export class OrderDetailMockCollection implements IEntityCollection<IOrderDetail> {

  path: string

  eventBus: IEventBus

  constructor(path: string, eventBus: IEventBus) {
    this.path = path
    this.eventBus = eventBus
  }

  prefill = async () => {
    let predata = _.omit(source[0], ['id'])
    console.log('predata', predata)
    return await delay(predata, 1000)
  }

  create = async (createRequest: IOrderDetail) => {
    let newValue: IOrderDetail = _.assign(
      createRequest,
      {id: source.length + ''}
    ) as IOrderDetail
    source.push(newValue)
    return await delay(newValue, 1000)
  }

  get = async (id: string) => {
    let value = _.find(source, {id})
    let index = _.findIndex(cache, {id})
    if (index !== -1) {
      cache.push(value)
    } else {
      cache[index] = value
    }
    return await delay(value, 1000)
  }

  getSync = (id: string) => {
    let value = _.find(cache, {id})
    return value
  }

  update = async (value: IOrderDetail) => {
    if (Math.random() > 0.5) {
      let res = await delay(value, 1000)
      const src_index = _.findIndex(source, {id: value.id})
      source[src_index] = value
      const cache_index = _.findIndex(cache, {id: value.id})
      cache[cache_index] = value
      this.eventBus.emit('ORDER_ITEM_CHANGE', {id: value.id})
      return res
    } else {
      throw new HTTPError(400, 'some errors')
    }
  }

  delete = async (id: string) => {
    _.remove(source, {id: id})
    return await delay(null, 1000)
  }

  list = async (filter: any, page = 0) => {
    let filtred = _.filter(source, /*filter ? filter :*/ () => true)
    console.log('OrderMockCollection filtred', filtred)
    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }

  listSync = (filter: any, page = 0) => {
    let filtred = _.filter(source, filter)
    return {value: filtred, count: filtred.length, page: page}
  }

  lookup = async (text: string, page = 0) => {
    let filtred = _.filter(source, (item: IOrderDetail) => {return item.product.name.indexOf(text) !== -1})
      .map((item, i) => ({id: item.id, name: item.product.name, desc: item.product.name}))

    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }


}