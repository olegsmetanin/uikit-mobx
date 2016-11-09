import {EntityCard} from '../api/EntityCard'
import {IOrder} from './IOrder.gen'
import {observer} from 'lib/Reactive'

@observer
export class OrderCard extends EntityCard<IOrder> {
}