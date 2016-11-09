import * as React from 'react'

import {observable} from 'lib/Reactive'
import {IEntityCollection} from './IEntityCollection'
import {guid} from 'generic'
import {IItemUIState, IListUIState} from 'generic'
import {IEventBus, IItemChangedEvent} from 'generic'
import {IPage} from './IPage'
import {IListQuery} from './IListQuery'

export interface IEntityListV2Props<T, F> {
  collection: IEntityCollection<T, F>
  filter?: any
  ListView: any
  Card: any
  Create?: any
  onDirtyChange?: (memId: string, isDirty: boolean) => void

  eventBus: IEventBus

  EVENT_ITEM_CHANGE: string

  pid: string

  cid: string

  store: any
}

export enum mode {
  List = 1,
  Create
}

export interface IEntityListV2State<F> {
  query: IListQuery<F>
}

export abstract class EntityListV2<T, F> extends React.Component<IEntityListV2Props<T, F>, void> {

  @observable
  mode: mode = mode.List

  @observable
  listValue: {value: T[], page: IPage}

  @observable
  listUIState: IListUIState

  @observable
  createValue: T

  @observable
  createErrors: any

  @observable
  createUIState: IItemUIState

  dirtyId: string = guid()

  Card: any
  _state: IEntityListV2State<F>

  constructor(props, context) {
    super(props, context)

    this.listUIState = {
      isLoading: false
    }

    const pid = `${this.props.pid}.${this.props.cid}`
    if (!this.props.store[pid]) {
      // init state
      const initState = Object.assign(
        {},
        this.getInitState(),
        this.props.filter
          ? { query: {filter: this.props.filter}}
          : {}
      )
      this.props.store[pid] = observable(initState)
    }
    this._state = this.props.store[pid]

    // this.createUIState = {
    //   isLoading: false,
    //   isSaving: false,
    //   isDeleting: false
    // }

    // this.listValue = this.props.collection.listSync()
  }

  abstract getInitState(): IEntityListV2State<F>

  componentDidMount() {
    this.loadList({filter: this.props.filter})
    this.props.eventBus.on<IItemChangedEvent>(this.props.EVENT_ITEM_CHANGE, this.onItemChanged)
  }

  componentWillReceiveProps(nextProps) {
    this.loadList({filter: nextProps.filter})
  }

  componentWillUnmount() {
    this.props.eventBus.off<IItemChangedEvent>(this.props.EVENT_ITEM_CHANGE, this.onItemChanged)
  }

  onItemChanged = async ({id}: {id: string}) => {

    // this.listUIState.isLoading = true
    let itemValue = await this.props.collection.get(id)
    // in case of update item from server
    // let itemValue = await this.props.collection.list({id})
    const index = _.findIndex(this.listValue.value, {id})
    if (index !== -1) {
      // in case of update item from server
      // Object.assign(this.listValue.value[index], itemValue.value[0])
      Object.assign(this.listValue.value[index], itemValue)
    }
    // this.listUIState.isLoading = false
  }

  loadList = async (query: IListQuery<F>) => {
    this.listUIState.isLoading = true
    const list =  await this.props.collection.list(query)
    this.listValue = list
    this._state.query.page = list.page

    this.listUIState.isLoading = false
  }

  // loadPrefill = async () => {
  //   this.createUIState.isLoading = true
  //   this.createPrefill = await this.props.orderCollection.prefill()
  //   this.createUIState.isLoading = false
  // }

  onCreate = () => {
    this.mode = mode.Create
  }

  // createOnSave = async (value: IOrder) => {
  //     try {
  //       this.createUIState.isSaving = true
  //       this.createValue = await this.props.orderCollection.create(value)
  //       this.createOnDirtyChange(false)
  //       this.createErrors = null
  //       this.mode = mode.List
  //     } catch (err) {
  //       this.createErrors = err
  //     } finally {
  //       this.createUIState.isSaving = false
  //     }
  // }

  // createOnCancel = () => {
  //   this.createOnDirtyChange(false)
  //   this.mode = mode.List
  // }

  // createOnDirtyChange = this.props.onDirtyChange.bind(this, this.dirtyId)

  onQueryChange = (query: IListQuery<F>) => {
    this.loadList(query)
  }

  render() {
    const {ListView, Card} = this.props
    const pid = `${this.props.pid}.${this.props.cid}`
    console.log('Cardlist pid:', pid)
    console.log('this._state', this._state)
    return (
      <div>
        {this.listUIState.isLoading && (
          <div>
            Loading
          </div>
        )}
        {this.listValue &&
          this.mode === mode.List && (
            <ListView
              pid={pid}
              value={this.listValue.value}
              query={this._state.query}
              onQueryChange={this.onQueryChange}
              Card={Card}
              onCreate={this.onCreate}
            />
          )
        }
        {/*!this.createUIState.isLoading && this.mode === mode.Create && (
          <OrderCreate
            value={this.createValue}
            errors={this.createErrors}
            onSave={this.createOnSave}
            onCancel={this.createOnCancel}
            onDirtyChange={this.createOnDirtyChange}
            isSaving={this.createUIState.isSaving}
          />
        )*/}
      </div>

    )
  }

}