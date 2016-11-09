import {EntityListV2} from '../api/EntityListV2'
import {IOrderDetail} from './IOrderDetail.gen'
import {IOrderDetailListFilter} from './IOrderDetailListFilter'
import {observer} from 'lib/Reactive'

@observer
export class OrderDetailListV2 extends EntityListV2<IOrderDetail, IOrderDetailListFilter> {
  getInitState() {
    return ({query: {filter: null, sort: null, page: null}})
  }
}