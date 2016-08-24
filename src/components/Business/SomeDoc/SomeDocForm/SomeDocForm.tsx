import * as React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

import * as _ from 'lodash'

import {IConfirmDialog} from 'components/api/ui/IConfirmDialog'
import {I18n} from 'components/api/i18n/I18n'
import {ISomeDoc} from 'components/model/ISomeDoc'

export interface ISomeDocFormProps {
  i18n: I18n
  value: ISomeDoc
  onSave: (value: ISomeDoc) => void
  onDelete: (value: ISomeDoc) => void
  onDirtyChange?: (isDirty: boolean) => void
  isSaving: boolean
  isDeleting: boolean
  showConfirmDialog: (confirmDialog: IConfirmDialog) => Promise<void>
}

@observer
export class SomeDocForm extends React.Component<ISomeDocFormProps, void> {

  @observable
  value: ISomeDoc

  @observable
  isDirty: boolean = false

  constructor(props, context) {
    super(props, context)
    this.value = _.cloneDeep(props.value)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps)
    if (this.props.value !== nextProps.value) {
      this.value = _.cloneDeep(nextProps.value)
      this.isDirty = false
      this.props.onDirtyChange && this.props.onDirtyChange(false)
    }

  }

  componentDidMount() {
    console.log('ComplexForm componentDidMount')
  }

  componentWillUnmount() {
    console.log('ComplexForm componentWillUnmount')
  }

  onSave = () => {
    this.props.onSave(_.cloneDeep(this.value))
  }

  onDelete = () => {
    this.props.showConfirmDialog({
      body: (
        <div>
          Delete?
        </div>
      ),
      onConfirm: () => {
        this.props.onDelete(_.cloneDeep(this.value))
      }
    })
  }

  setDirty(isDirty) {
    this.isDirty = isDirty
    this.props.onDirtyChange && this.props.onDirtyChange(isDirty)
  }

  onChangeText = (e) => {
    this.value.text = e.target.value
    this.setDirty(true)

  }

  onChangeNum = (e) => {
    this.value.num = e.target.value
    this.setDirty(true)
  }

  onChangeCheck = (e) => {
    this.value.check = e.target.checked
    this.setDirty(true)
  }

  render() {
    let {i18n} = this.props
    return (
      <div>
        <div>{i18n('app:title', {title: 'Title', count: 2})}</div>
        <div>{i18n('module:title', {title: 'Title', count: 2})}</div>
        <div>Id: {this.value.id}</div>
        <input type="text" value={this.value.text} onChange={this.onChangeText}/>
        <input type="text" value={this.value.num} onChange={this.onChangeNum}/>
        <input type="checkbox" value={this.value.check} onChange={this.onChangeCheck}/>
        {this.isDirty && (
           <button disabled={this.props.isSaving} onClick={this.onSave}>
             {this.props.isSaving
               ? 'Saving'
               : 'Save'
             }
           </button>
        )}
        <button disabled={this.props.isDeleting} onClick={this.onDelete}>
          {this.props.isDeleting
            ? 'Deleting'
            : 'Delete'
          }
        </button>

      </div>
    )
  }
}

export default SomeDocForm