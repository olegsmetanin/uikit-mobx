import {EntityList} from '../api/EntityList'
import {IOrderDetail} from './IOrderDetail.gen'
import {observer} from 'lib/Reactive'
import {IOrderDetailListFilter} from './IOrderDetailListFilter'

@observer
export class OrderDetailList extends EntityList<IOrderDetail, IOrderDetailListFilter> {
}