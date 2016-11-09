import {EntityListView} from '../api/EntityListView'
import {IOrder} from './IOrder.gen'
import {observer} from 'lib/Reactive'

@observer
export class OrderListView extends EntityListView<IOrder> {
}