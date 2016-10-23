import {EntityList} from '../api/EntityList'
import {IOrder} from './IOrder'
import {observer} from 'lib/Reactive'

@observer
export class OrderList extends EntityList<IOrder> {
}