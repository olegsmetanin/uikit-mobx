import {IEventBus} from 'generic'
import {EntityMockCollection} from '../api/EntityMockCollection'

import {IOrder} from './IOrder'

let source: IOrder[] = [
    {
      id: '0',
      customer: {id: '1', name: 'Customer1', desc: 'Customer1'},
      customer1: {id: '1', name: 'Customer1', desc: 'Customer1'},
      name: 'SomeOrder',
      price: 1
    },
    {
      id: '1',
      customer: {id: '2', name: 'Customer2', desc: 'Customer2'},
      customer1: {id: '2', name: 'Customer2', desc: 'Customer2'},
      name: 'SomeOrder2',
      price: 2
    }
  ]

export class OrderMockCollection extends EntityMockCollection<IOrder> {
  constructor({path, eventBus}: {path: string, eventBus: IEventBus}) {
    super({
      path,
      eventBus,
      source,
      mapEntityToLookup: (value) => ({id: value.id, name: value.name, desc: value.name})
    })
  }
}