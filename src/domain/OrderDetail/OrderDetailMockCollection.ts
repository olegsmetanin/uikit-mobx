import {delay} from 'generic/utils/delay'

import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'

import {IOrderDetail} from './IOrderDetail'

let source: IOrderDetail[] = [
    {
      id: '0',
      order: {id: '0', name: 'Order0', desc: 'Order0'},
      product: {id: '0', name: 'Product0', desc: 'Product0'},
      quantity: 1,
      price: 1
    },
    {
      id: '1',
      order: {id: '0', name: 'Order0', desc: 'Order0'},
      product: {id: '1', name: 'Product1', desc: 'Product1'},
      quantity: 1,
      price: 2
    },
    {
      id: '2',
      order: {id: '1', name: 'Order1', desc: 'Order1'},
      product: {id: '1', name: 'Product1', desc: 'Product1'},
      quantity: 1,
      price: 2
    }
  ]

export class OrderDetailMockCollection extends EntityMockCollection<IOrderDetail> {

  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({id: value.id, name: value.product.name, desc: value.product.name})
    })
  }

  list = async (filter: any, page = 0) => {
    console.log('OrderDetailMockCollection filter', filter)
    let filtred = _.filter(this.source, filter ? filter : () => true)
    console.log('OrderDetailMockCollection filtred', filtred)
    return await delay({value: filtred, count: filtred.length, page: page}, 1000)
  }

}
