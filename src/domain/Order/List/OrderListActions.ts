import {IOrderCollection} from '../IOrderCollection'
import {IOrderListState} from './IOrderListState'
import {IOrderListActions} from './IOrderListActions'
import {transaction} from 'lib/Reactive'

export class OrderListActions implements IOrderListActions {

  state: IOrderListState
  collection: IOrderCollection

  constructor(state: IOrderListState, collection: IOrderCollection) {
    this.state = state
    this.collection = collection
  }


  list = async (filter: any, page = 0, add = false) => {
    let state = this.state
    state.isLoading = true
    console.log('OrderListActions is loading true')
    let res = await this.collection.list(filter, page)
    let {value, count} = res
    let _page = res.page

    transaction(() => {
      if (add) {
        state.value = state.value.concat(value)
      } else {
        state.value = value
      }

      state.count = count
      state.page = _page
      state.isLoading = false
    })
    console.log('OrderListActions is loading false')
  }
}