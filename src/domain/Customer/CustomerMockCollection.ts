import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'
import {CUSTOMER_ITEM_CHANGE} from './CustomerCollectionEvents'

import {ICustomer} from './ICustomer'

let source: ICustomer[] = [
  {
    id: '0',
    name: 'Customer0'
  },
  {
    id: '1',
    name: 'Customer1'
  }
]

export class CustomerMockCollection extends EntityMockCollection<ICustomer> {
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
      EVENT_ITEM_CHANGE: CUSTOMER_ITEM_CHANGE
    })
  }
}