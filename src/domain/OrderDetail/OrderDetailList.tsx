import {EntityList} from '../api/EntityList'
import {IOrderDetail} from './IOrderDetail'
import {observer} from 'lib/Reactive'

@observer
export class OrderDetailList extends EntityList<IOrderDetail> {
}