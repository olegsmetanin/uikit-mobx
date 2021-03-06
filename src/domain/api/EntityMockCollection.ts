import { IEntity } from './IEntity';
import {delay} from 'generic/utils/delay'
import * as _ from 'lodash'
import {HTTPError} from 'generic'
import {IEventBus} from 'generic'
import {IEntityCollection} from '../api/IEntityCollection'
import {ILookup} from 'generic';
import {IListQuery} from './IListQuery'

export abstract class EntityMockCollection<T extends IEntity, F> implements IEntityCollection<T, F> {

  path: string

  eventBus: IEventBus

  source: T[] = []

  cache: T[] = []

  mapEntityToLookup: ((value: T) => ILookup)

  EVENT_ITEM_CHANGE: string

  constructor({
    path,
    eventBus,
    source,
    mapEntityToLookup,
    EVENT_ITEM_CHANGE
  }: {
    path: string,
    eventBus: IEventBus,
    source: T[],
    mapEntityToLookup: ((value: T) => ILookup),
    EVENT_ITEM_CHANGE
  }) {
    this.path = path
    this.eventBus = eventBus
    this.source = source
    this.mapEntityToLookup = mapEntityToLookup
    this.EVENT_ITEM_CHANGE = EVENT_ITEM_CHANGE
  }

  prefill = async () => {
    let predata = _.omit(this.source[0], ['id'])
    // console.log('predata', predata)
    return await delay(predata, 1000)
  }

  create = async (createRequest: T) => {
    let newValue: T = _.assign(
      createRequest,
      {id: this.source.length + ''}
    ) as T
    this.source.push(newValue)
    return await delay(newValue, 1000)
  }

  get = async (id: string) => {
    let value = _.find(this.source, {id})
    let index = _.findIndex(this.cache, {id})
    if (index !== -1) {
      this.cache.push(value)
    } else {
      this.cache[index] = value
    }
    return await delay(value, 1000)
  }

  getSync = (id: string) => {
    let value = _.find(this.cache, {id})
    return value
  }

  update = async (value: T) => {
    if (Math.random() > 0.5) {
      let res = await delay(value, 1000)
      const src_index = _.findIndex(this.source, {id: value.id})
      this.source[src_index] = value
      const cache_index = _.findIndex(this.cache, {id: value.id})
      this.cache[cache_index] = value
      this.eventBus.emit(this.EVENT_ITEM_CHANGE, {id: value.id})
      return res
    } else {
      throw new HTTPError(400, 'some errors')
    }
  }

  delete = async (id: string) => {
    _.remove(this.source, {id: id})
    return await delay(null, 1000)
  }

  list = async (query: IListQuery<F>) => {
    let filtred = _.filter(this.source, (query && query.filter) ? query.filter : () => true)
    return await delay(
      {
        value: filtred,
        page: {
          count: filtred.length,
          offset: (query && query.page && query.page.offset) || 0,
          limit: (query && query.page && query.page.limit) || 0
        }
      }
      , 1000
    )
  }

  listSync = (query: IListQuery<F>) => {
    let filtred = _.filter(this.source, query.filter)
    return {
      value: filtred,
      page: {
        count: filtred.length,
        offset: query.page.offset,
        limit: query.page.limit
      }
    }
  }

  lookup = async (query: IListQuery<F>) => {
    let filtred = _
      .map(this.source, (item: T) => this.mapEntityToLookup(item))
      .filter(
        (item) => true // item.name.indexOf(text) !== -1
      )

      console.log('filtred', filtred)

    return await delay(
      {
        value: filtred,
        page: {
          count: filtred.length,
          offset: query.page.offset,
          limit: query.page.limit
        }
      }
      , 1000
    )
  }


}