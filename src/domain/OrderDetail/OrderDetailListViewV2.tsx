import {EntityListViewV2} from '../api/EntityListViewV2'
import {IOrderDetail} from './IOrderDetail.gen'
import {IOrderDetailListFilter} from './IOrderDetailListFilter'
import {observer} from 'lib/Reactive'

@observer
export class OrderDetailListViewV2 extends EntityListViewV2<IOrderDetail, IOrderDetailListFilter> {
}