import * as React from 'react'
import {observable, transaction} from 'lib/Reactive'
import {IEntityCollection} from './IEntityCollection'
import {IEntity} from './IEntity'
import {Lookup} from 'generic'
import {ILookup} from 'generic';
import {IEventBus} from 'generic';
import {IItemChangedEvent} from 'generic';

export interface IEntityLookupProps<T> {
  collection: IEntityCollection<T>
  eventBus: IEventBus
  onChange: (value: ILookup) => void
  EVENTID: string
}

export interface IEntityLookupState {
  value: ILookup[]
  count: number
  page: number
  isLoading: boolean
}

export abstract class EntityLookup<T extends IEntity> extends React.Component<IEntityLookupProps<T>, any> {

    @observable
    _state: IEntityLookupState

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
      this.props.eventBus.on<IItemChangedEvent>(this.props.EVENTID, this.onItemChanged)
    }

    componentWillUnmount() {
      this.props.eventBus.off<IItemChangedEvent>(this.props.EVENTID, this.onItemChanged)
    }

    onItemChanged = ({id}: {id: number}) => {
      // console.log('EntityLookup onItemChanged ', id)
    }

    lookup = async (filter: any, page = 0, add = false) => {
      let state = this._state
      state.isLoading = true
      let res = await this.props.collection.lookup(filter, page)
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
    }

    render() {
      let state = this._state
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
