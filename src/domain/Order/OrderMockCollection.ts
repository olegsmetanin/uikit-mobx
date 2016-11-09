import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'

import {IOrder} from './IOrder.gen'
import {ORDER_ITEM_CHANGE} from './OrderCollectionEvents.gen'

import {IOrderListFilter} from './IOrderListFilter'


let source: IOrder[] = [
    {
      id: '0',
      customer: {id: '0', name: 'Customer0', desc: 'Customer0'},
      name: 'Order0',
      price: 1,
      status: 1
    },
    {
      id: '1',
      customer: {id: '1', name: 'Customer1', desc: 'Customer1'},
      name: 'Order1',
      price: 2,
      status: 1
    }
  ]

export class OrderMockCollection extends EntityMockCollection<IOrder, IOrderListFilter> {
  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({id: value.id, name: value.name, desc: value.name}),
      EVENT_ITEM_CHANGE: ORDER_ITEM_CHANGE
    })
  }
}