import * as React from 'react'

import {observable} from 'lib/Reactive'
import {IEntityCollection} from './IEntityCollection'
import {guid} from 'generic'
import {IItemUIState, IListUIState} from 'generic'
import {IEventBus, IItemChangedEvent} from 'generic'

export interface IEntityListProps<T> {
  collection: IEntityCollection<T>
  filter?: any
  ListView: any
  Card: any
  Create?: any
  onDirtyChange?: (memId: string, isDirty: boolean) => void

  eventBus: IEventBus

  EVENT_ITEM_CHANGE: string

  pid: string

  cid: string
}

export enum mode {
  List = 1,
  Create
}

export abstract class EntityList<T> extends React.Component<IEntityListProps<T>, void> {

  @observable
  mode: mode = mode.List

  @observable
  listValue: {value: T[], count: number, page: number}

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

  constructor(props, context) {
    super(props, context)

    this.listUIState = {
      isLoading: false
    }


    // this.createUIState = {
    //   isLoading: false,
    //   isSaving: false,
    //   isDeleting: false
    // }

    // this.listValue = this.props.collection.listSync()
  }

  componentDidMount() {
    this.loadList(this.props.filter)
    this.props.eventBus.on<IItemChangedEvent>(this.props.EVENT_ITEM_CHANGE, this.onItemChanged)
  }

  componentWillReceiveProps(nextProps) {
    this.loadList(nextProps.filter)
  }

  componentWillUnmount() {
    this.props.eventBus.off<IItemChangedEvent>(this.props.EVENT_ITEM_CHANGE, this.onItemChanged)
  }

  onItemChanged = async ({id}: {id: string}) => {

    // this.listUIState.isLoading = true
    let itemValue = await this.props.collection.list({id})
    const index = _.findIndex(this.listValue.value, {id})
    if (index !== -1) {
      Object.assign(this.listValue.value[index], itemValue.value[0])
    }
    // this.listUIState.isLoading = false
  }

  loadList = async (filter: any) => {
    this.listUIState.isLoading = true
    this.listValue = await this.props.collection.list(filter)
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

  render() {
    const {ListView, Card} = this.props
    const pid = `${this.props.pid}.${this.props.cid}`
    return (
      <div>
        {!this.listUIState.isLoading &&
          this.listValue &&
          this.mode === mode.List && (
            <ListView
              pid={pid}
              value={this.listValue.value}
              count={this.listValue.count}
              page={this.listValue.page}
              filter={this.props.filter}
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
        {this.listUIState.isLoading && (
          <div>
            Loading
          </div>
        )}
      </div>

    )
  }

}