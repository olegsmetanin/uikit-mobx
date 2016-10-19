/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {reaction, observer, observable, transaction} from 'lib/Reactive'
import {ICustomerLookupState} from './ICustomerLookupState'
import {ICustomerService} from '../ICustomerService'
import {Lookup} from 'generic'
import {ILookup} from 'generic';
import {IEventBus} from 'generic';
import {IItemChangedEvent} from 'generic';

export interface ICustomerLookupProps {
  service: ICustomerService
  eventBus: IEventBus
  onChange: (value: ILookup) => void
}

@observer
export class CustomerLookup extends React.Component<ICustomerLookupProps, any> {

    @observable
    _state: ICustomerLookupState

    constructor(props, context) {
      super(props, context)

      this._state = {
        value: null,
        count: 0,
        isLoading: false,
        page: 0
      }
    }

    componentDidMount() {
      this.props.eventBus.on<IItemChangedEvent>('CUSTOMER_ITEM_CHANGE', this.onItemChanged)
    }

    componentWillUnmount() {
      this.props.eventBus.off<IItemChangedEvent>('CUSTOMER_ITEM_CHANGE', this.onItemChanged)
    }

    onItemChanged = ({id}: {id: number}) => {
      console.log('CustomerLookup onItemChanged ', id)
    }

    lookup = async (filter: any, page = 0, add = false) => {
      let state = this._state
      state.isLoading = true
      console.log('CustomerLookup is loading true')
      let res = await this.props.service.lookup(filter, page)
      let {value, count} = res
      console.log('CustomerLookup lookup value', res.value)
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
      console.log('CustomerLookup is loading false')
    }

    render() {
      let state = this._state
      console.log('CustomerLookup render state', state)
      return (
        <Lookup
          isLoading={state.isLoading}
          count={state.count}
          data={state.value}
          onSearch={this.lookup}
          {...this.props}
        />
      )
    }
}
