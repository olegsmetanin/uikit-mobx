import {IEventBus} from 'generic'

import {IProduct} from './IProduct'
import {EntityMockCollection} from '../api/EntityMockCollection'
import {PRODUCT_ITEM_CHANGE} from './ProductCollectionEvents'

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


export class ProductMockCollection extends EntityMockCollection<IProduct> {
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