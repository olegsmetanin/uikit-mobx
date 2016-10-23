import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'

import {ICustomer} from './ICustomer'

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

export class CustomerMockCollection extends EntityMockCollection<ICustomer> {
  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({id: value.id, name: value.name, desc: value.name})
    })
  }
}