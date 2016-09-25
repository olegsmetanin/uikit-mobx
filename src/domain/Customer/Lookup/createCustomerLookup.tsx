/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {CustomerLookupActions} from './CustomerLookupActions'
import {ICustomerLookupState} from './ICustomerLookupState'
import {reaction, observer, observable} from 'lib/Reactive'
import {ICustomerService} from '../Service/ICustomerService'
import {Lookup} from 'generic/Lookup/Lookup'


export const createCustomerLookup = (service: ICustomerService) => {

  return class extends React.Component<any, any> {

    theState: ICustomerLookupState = observable({
      value: null,
      count: 0,
      isLoading: false,
      page: 0
    })

    actions: CustomerLookupActions

    constructor(props, context) {
      super(props, context)
      this.actions = new CustomerLookupActions(this.theState, service)
      console.log('createCustomerLookup actions', this.actions)

    }

    render() {
      return (
        <Lookup
          isLoading={this.theState.isLoading}
          count={this.theState.count}
          data={this.theState.value}
          onSearch={this.actions.lookup}
          {...this.props}
        />
      )
    }
  }

}
