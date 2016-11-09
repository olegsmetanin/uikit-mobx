import {EntityLookup} from '../api/EntityLookup'
import {ICustomer} from './ICustomer.gen'
import {observer} from 'lib/Reactive'
import {ICustomerListFilter} from './ICustomerListFilter'

@observer
export class CustomerLookup extends EntityLookup<ICustomer, ICustomerListFilter> {
}