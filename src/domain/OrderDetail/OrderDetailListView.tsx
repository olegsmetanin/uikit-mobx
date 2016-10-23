import {EntityListView} from '../api/EntityListView'
import {IOrderDetail} from './IOrderDetail'
import {observer} from 'lib/Reactive'

@observer
export class OrderDetailListView extends EntityListView<IOrderDetail> {
}