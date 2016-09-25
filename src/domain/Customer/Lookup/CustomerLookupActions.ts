
import {ICustomerLookupState} from './ICustomerLookupState'
import {ICustomerLookupActions} from './ICustomerLookupActions'
import {transaction} from 'lib/Reactive'
import {ICustomerService} from '../Service/ICustomerService'

export class CustomerLookupActions implements ICustomerLookupActions {

  state: ICustomerLookupState
  service: ICustomerService

  constructor(state: ICustomerLookupState, service: ICustomerService) {
    this.state = state
    this.service = service
  }


  lookup = async (filter: any, page = 0, add = false) => {
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