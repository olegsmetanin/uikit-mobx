import {EntityList} from '../api/EntityList'
import {IOrder} from './IOrder.gen'
import {observer} from 'lib/Reactive'
import {IOrderListFilter} from './IOrderListFilter'

@observer
export class OrderList extends EntityList<IOrder, IOrderListFilter> {
}