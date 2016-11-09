import {observer} from 'lib/Reactive'
import {IOrderDetail} from './IOrderDetail.gen'
import {EntityCard} from '../api/EntityCard'

@observer
export class OrderDetailCard extends EntityCard<IOrderDetail> {
}