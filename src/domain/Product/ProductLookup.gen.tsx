import {EntityLookup} from '../api/EntityLookup'
import {IProduct} from './IProduct.gen'
import {observer} from 'lib/Reactive'
import {IProductListFilter} from './IProductListFilter'

@observer
export class ProductLookup extends EntityLookup<IProduct, IProductListFilter> {
}