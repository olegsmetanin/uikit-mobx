import {EntityLookup} from '../api/EntityLookup'
import {ICustomer} from './ICustomer'
import {observer} from 'lib/Reactive'

@observer
export class CustomerLookup extends EntityLookup<ICustomer> {
}