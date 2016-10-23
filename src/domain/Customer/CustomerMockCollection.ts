import {IEntityCollection} from '../api/IEntityCollection'
import {delay} from 'generic'
import {ICustomer} from './ICustomer'
import * as _ from 'lodash'
import {IEventBus} from 'generic'
import {HTTPError} from 'generic'

let source: ICustomer[] = [
  {
    id: '1',
    name: 'Customer1'
  },
  {
    id: '2',
    name: 'Customer2'
  }
]

let cache: ICustomer[] = []

export class CustomerMockCollection implements IEntityCollection<ICustomer> {

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

  create = async (createRequest: ICustomer) => {
    let newValue: ICustomer = _.assign(
      createRequest,
      {id: source.length + ''}
    ) as ICustomer
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

  update = async (value: ICustomer) => {
    if (Math.random() > 0.5) {
      let res = await delay(value, 1000)
      const src_index = _.findIndex(source, {id: value.id})
      source[src_index] = value
      const cache_index = _.findIndex(cache, {id: value.id})
      cache[cache_index] = value
      // this.eventBus.emit('ORDER_ITEM_CHANGE', {id: value.id})
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
    let filtred = _.filter(source, filter ? filter : () => true)
    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }

  listSync = (filter: any, page = 0) => {
    let filtred = _.filter(source, filter)
    return {value: filtred, count: filtred.length, page: page}
  }

  lookup = async (text: string, page = 0) => {
    let filtred = _.filter(source, () => true /*{name: text}*/)
      .map((item, i) => ({id: item.id, name: item.name, desc: item.name}))

    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }



}