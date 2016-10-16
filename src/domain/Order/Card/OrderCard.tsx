import * as React from 'react'

import {observer, observable} from 'lib/Reactive'
import {IOrder} from '../IOrder'
import {IOrderCollection} from '../IOrderCollection'
import {guid} from 'generic'

export interface IOrderCardProps {
  orderCollection: IOrderCollection
  oid: string
  OrderView: any
  OrderEdit: any
  Dialog: any
  onDirtyChange: (memId: string, isDirty: boolean) => void

  onDelete: () => void
}

export enum mode {
  View = 1,
  Edit,
  Sign
}

export interface IOrderUIState {
  isLoading: boolean
  isSaving: boolean
  isDeleting: boolean
}

@observer
export class OrderCard extends React.Component<IOrderCardProps, void> {

  @observable
  mode: mode = mode.View

  @observable
  value: IOrder

  @observable
  uiState: IOrderUIState

  @observable
  editErrors: any

  @observable
  showDeleteDialog: boolean

  dirtyEditId: string = guid()

  constructor(props, context) {
    super(props, context)
    this.uiState = {
      isLoading: false,
      isSaving: false,
      isDeleting: false
    }
  }

  componentDidMount() {
    this.load(this.props.oid)
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps.oid)
  }

  load = async (oid: string) => {
    this.uiState.isLoading = true
    this.value = await this.props.orderCollection.get(oid)
    this.uiState.isLoading = false
  }

  onEdit = () => {
    this.mode = mode.Edit
  }

  onDelete = () => {
    this.showDeleteDialog = true
  }

  onEditSave = async (value: IOrder) => {
      try {
        this.uiState.isSaving = true
        this.value = await this.props.orderCollection.update(value)
        this.onEditDirtyChange(false)
        this.mode = mode.View
      } catch (err) {
        this.editErrors = err
      } finally {
        this.uiState.isSaving = false
      }
  }

  onEditCancel = () => {
    this.onEditDirtyChange(false)
    this.mode = mode.View
  }

  onEditDirtyChange = this.props.onDirtyChange.bind(this, this.dirtyEditId)

  onOkDelete = () => {
    this.showDeleteDialog = false
    this.props.onDelete()
  }

  onCancelDelete = () => {
    this.showDeleteDialog = false
  }
  render() {

    const {OrderView, OrderEdit, Dialog} = this.props

    return (
      <div>
        {!this.uiState.isLoading && this.mode === mode.View && (
          <OrderView
            value={this.value}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
          />
        )}
        {!this.uiState.isLoading && this.mode === mode.Edit && (
          <OrderEdit
            value={this.value}
            errors={this.editErrors}
            onSave={this.onEditSave}
            onCancel={this.onEditCancel}
            onDirtyChange={this.onEditDirtyChange}
            isSaving={this.uiState.isSaving}
          />
        )}
        {this.showDeleteDialog && (
          <Dialog>
            Are you sure to delete record?
            <button onClick={this.onOkDelete}>Ok</button>
            <button onClick={this.onCancelDelete}>Cancel</button>
          </Dialog>
        )}
        {this.uiState.isLoading && (
          <div>
            Loading
          </div>
        )}
      </div>

    )
  }

}