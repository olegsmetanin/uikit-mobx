import {observer} from 'lib/Reactive'
import {IOrderDetail} from './IOrderDetail'
import {EntityCard} from '../api/EntityCard'

@observer
export class OrderDetailCard extends EntityCard<IOrderDetail> {
}