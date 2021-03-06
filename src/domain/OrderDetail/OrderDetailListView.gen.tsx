import {EntityListView} from '../api/EntityListView'
import {IOrderDetail} from './IOrderDetail.gen'
import {observer} from 'lib/Reactive'

@observer
export class OrderDetailListView extends EntityListView<IOrderDetail> {
}