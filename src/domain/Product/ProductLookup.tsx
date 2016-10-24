import {EntityLookup} from '../api/EntityLookup'
import {IProduct} from './IProduct'
import {observer} from 'lib/Reactive'

@observer
export class ProductLookup extends EntityLookup<IProduct> {
}