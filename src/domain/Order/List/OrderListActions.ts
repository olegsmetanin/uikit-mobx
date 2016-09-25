
import {IOrderService} from '../Service/IOrderService'
import {IOrderListState} from './IOrderListState'
import {IOrderListActions} from './IOrderListActions'
import {transaction} from 'lib/Reactive'

export class OrderListActions implements IOrderListActions {

  state: IOrderListState
  service: IOrderService

  constructor(state: IOrderListState, service: IOrderService) {
    this.state = state
    this.service = service
  }


  list = async (filter: any, page = 0, add = false) => {
    let state = this.state
    state.isLoading = true
    console.log('OrderListActions is loading true')
    let res = await this.service.list(filter, page)
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