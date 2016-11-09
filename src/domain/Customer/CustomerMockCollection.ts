import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'
import {CUSTOMER_ITEM_CHANGE} from './CustomerCollectionEvents.gen'

import {ICustomer} from './ICustomer.gen'
import {ICustomerListFilter} from './ICustomerListFilter'


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

export class CustomerMockCollection extends EntityMockCollection<ICustomer, ICustomerListFilter> {
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