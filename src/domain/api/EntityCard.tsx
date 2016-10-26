import * as React from 'react'

import {observable, toJS} from 'lib/Reactive'
import {IEntity} from './IEntity'
import {IEntityCollection} from './IEntityCollection'
import {guid} from 'generic'
import {IItemUIState} from 'generic'

export interface IEntityCardProps<T> {
  collection: IEntityCollection<T>
  oid: string
  View: any
  Edit: any
  Dialog: any
  onDirtyChange: (memId: string, isDirty: boolean) => void

  onDelete: () => void

  pid: string
  cid: string
}

export enum mode {
  View = 1,
  Edit,
  Sign
}

export abstract class EntityCard<T extends IEntity> extends React.Component<IEntityCardProps<T>, void> {

  @observable
  mode: mode = mode.View

  @observable
  value: T

  @observable
  uiState: IItemUIState

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

    this.value = this.props.collection.getSync(this.props.oid)
  }

  componentDidMount() {
    if (!this.value) {
      this.load(this.props.oid)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps.oid)
  }

  load = async (oid: string) => {
    this.uiState.isLoading = true
    this.value = await this.props.collection.get(oid)
    this.uiState.isLoading = false
  }

  onEdit = () => {
    this.mode = mode.Edit
  }

  onDelete = () => {
    this.showDeleteDialog = true
  }

  editOnSave = async (value: T) => {
      try {
        this.uiState.isSaving = true
        this.value = await this.props.collection.update(toJS(value))
        this.editOnDirtyChange(false)
        this.editErrors = null
        this.mode = mode.View
      } catch (err) {
        this.editErrors = err
      } finally {
        this.uiState.isSaving = false
      }
  }

  editOnCancel = () => {
    this.editOnDirtyChange(false)
    this.mode = mode.View
  }

  editOnDirtyChange = this.props.onDirtyChange.bind(this, this.dirtyEditId)

  deleteOnOk = () => {
    this.showDeleteDialog = false
    this.props.onDelete()
  }

  deleteOnCancel = () => {
    this.showDeleteDialog = false
  }
  render() {
    const {View, Edit, Dialog} = this.props
    const pid = `${this.props.pid}.${this.props.cid}[${this.props.oid}]`
    console.log('Card pid:', pid)
    return (
      <div>
        {!this.uiState.isLoading && this.value && this.mode === mode.View && (
          <View
            pid={pid}
            value={this.value}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
          />
        )}
        {!this.uiState.isLoading && this.value && this.mode === mode.Edit && (
          <Edit
            pid={pid}
            value={this.value}
            errors={this.editErrors}
            onSave={this.editOnSave}
            onCancel={this.editOnCancel}
            onDirtyChange={this.editOnDirtyChange}
            isSaving={this.uiState.isSaving}
          />
        )}
        {this.showDeleteDialog && (
          <Dialog>
            Are you sure to delete record?
            <button onClick={this.deleteOnOk}>Ok</button>
            <button onClick={this.deleteOnCancel}>Cancel</button>
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