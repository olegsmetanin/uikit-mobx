import {IEventBus} from 'generic'

import {IProduct} from './IProduct'
import {EntityMockCollection} from '../api/EntityMockCollection'

let source: IProduct[] = [
    {
      id: '0',
      name: 'SomeProduct0'
    },
    {
      id: '1',
      name: 'SomeProduct1'
    }
  ]


export class ProductMockCollection extends EntityMockCollection<IProduct> {
  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({id: value.id, name: value.name, desc: value.name})
    })
  }

}