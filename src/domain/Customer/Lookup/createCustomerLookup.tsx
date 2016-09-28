/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {reaction, observer, observable, transaction} from 'lib/Reactive'
import {ICustomerLookupState} from './ICustomerLookupState'
import {ICustomerService} from '../ICustomerService'
import {Lookup} from 'generic/Lookup/Lookup'
import {ICustomerLookup} from './ICustomerLookup';

export const createCustomerLookup = (service: ICustomerService) => {

  return class extends React.Component<any, any> {

    theState: ICustomerLookupState = observable({
      value: null,
      count: 0,
      isLoading: false,
      page: 0
    })

    lookup = async (filter: any, page = 0, add = false) => {
      let state = this.theState
      state.isLoading = true
      console.log('OrderListActions is loading true')
      let res = await service.list(filter, page)
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

    render() {
      return (
        <Lookup
          isLoading={this.theState.isLoading}
          count={this.theState.count}
          data={this.theState.value}
          onSearch={this.lookup}
          {...this.props}
        />
      )
    }
  }

}
