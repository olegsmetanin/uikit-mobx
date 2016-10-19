import * as React from 'react'

import {observer, observable} from 'lib/Reactive'
import {IOrder} from '../IOrder'
import {IOrderCollection} from '../IOrderCollection'
import {guid} from 'generic'
import {IOrderUIState} from '../Card/IOrderUIState'
import {IEventBus, IItemChangedEvent} from 'generic'

export interface IOrderListProps {
  orderCollection: IOrderCollection
  filter?: any /*IOrderFilter*/
  OrderListView: any
  OrderCard: any
  OrderCreate?: any
  onDirtyChange?: (memId: string, isDirty: boolean) => void

  eventBus: IEventBus
}

export enum mode {
  List = 1,
  Create
}

export interface IOrderListUIState {
  isLoading: boolean
}

@observer
export class OrderList extends React.Component<IOrderListProps, void> {

  @observable
  mode: mode = mode.List

  @observable
  listValue: {value: IOrder[], count: number, page: number}

  @observable
  listUIState: IOrderListUIState

  @observable
  createValue: IOrder

  @observable
  createErrors: any

  @observable
  createUIState: IOrderUIState

  dirtyId: string = guid()

  constructor(props, context) {
    super(props, context)
    console.log('OrderList create')

    this.listUIState = {
      isLoading: false
    }


    // this.createUIState = {
    //   isLoading: false,
    //   isSaving: false,
    //   isDeleting: false
    // }
  }

  componentDidMount() {
    this.loadList(this.props.filter)
    this.props.eventBus.on<IItemChangedEvent>('ORDER_ITEM_CHANGE', this.onItemChanged)
  }

  componentWillReceiveProps(nextProps) {
    this.loadList(nextProps.filter)
  }

  componentWillUnmount() {
    this.props.eventBus.off<IItemChangedEvent>('ORDER_ITEM_CHANGE', this.onItemChanged)
  }

  onItemChanged = async ({id}: {id: string}) => {
    console.log('EventBus onItemChanged id', id)

    // this.listUIState.isLoading = true
    let itemValue = await this.props.orderCollection.list({id})
    console.log('itemValue', itemValue)
    const index = _.findIndex(this.listValue.value, {id})
    if (index !== -1) {
      this.listValue.value[index] = itemValue.value[0]
    }
    // this.listUIState.isLoading = false
  }

  loadList = async (filter: any) => {
    this.listUIState.isLoading = true
    this.listValue = await this.props.orderCollection.list(filter)
    console.log('this.listValue', this.listValue)
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
    console.log('OrderList render props', this.props)
    const {OrderListView, OrderCard} = this.props

    return (
      <div>
        {!this.listUIState.isLoading &&
          this.listValue &&
          this.mode === mode.List && (
            <OrderListView
              value={this.listValue.value}
              count={this.listValue.count}
              page={this.listValue.page}
              OrderCard={OrderCard}
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