import {IEventBus} from 'generic'

import {IProduct} from './IProduct.gen'
import {EntityMockCollection} from '../api/EntityMockCollection'
import {PRODUCT_ITEM_CHANGE} from './ProductCollectionEvents.gen'
import {IProductListFilter} from './IProductListFilter'

let source: IProduct[] = [
    {
      id: '0',
      name: 'Product0'
    },
    {
      id: '1',
      name: 'Product1'
    }
  ]


export class ProductMockCollection extends EntityMockCollection<IProduct, IProductListFilter> {
  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({
        id: value.id,
        name: value.name,
        desc: value.name
      }),
      EVENT_ITEM_CHANGE: PRODUCT_ITEM_CHANGE
    })
  }

}