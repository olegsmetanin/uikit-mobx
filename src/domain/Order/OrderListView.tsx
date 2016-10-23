import {EntityListView} from '../api/EntityListView'
import {IOrder} from './IOrder'
import {observer} from 'lib/Reactive'

@observer
export class OrderListView extends EntityListView<IOrder> {
}