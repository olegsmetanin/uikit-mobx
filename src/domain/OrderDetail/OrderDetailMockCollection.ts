// import {delay} from 'generic/utils/delay'

import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'

import {IOrderDetail} from './IOrderDetail.gen'
import {ORDERDETAIL_ITEM_CHANGE} from './OrderDetailCollectionEvents.gen'
import {IOrderDetailListFilter} from './IOrderDetailListFilter'



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

export class OrderDetailMockCollection extends EntityMockCollection<IOrderDetail, IOrderDetailListFilter> {

  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({
        id: value.id,
        name: value.product.name,
        desc: value.product.name
      }),
      EVENT_ITEM_CHANGE: ORDERDETAIL_ITEM_CHANGE
  })
  }

}
