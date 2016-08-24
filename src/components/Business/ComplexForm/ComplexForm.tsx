import * as React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

import * as _ from 'lodash'

import {IConfirmDialog} from '../../api/ui/IConfirmDialog'
import {I18n} from '../../api/i18n/I18n'

export enum SelectOptions { Option1, Option2, Option3 }

export interface IComplexFormValue {
  text: string
  // checkbox: boolean;
  // combo: SelectOptions;
  // radio: SelectOptions;
  // checkedList: {name: string, checked}[]
}

export interface IComplexFormProps {
  i18n: I18n
  value: IComplexFormValue
  onSave: (value: IComplexFormValue) => void
  onDelete: (value: IComplexFormValue) => void
  onDirtyChange?: (isDirty: boolean) => void
  showConfirmDialog: (confirmDialog: IConfirmDialog) => Promise<void>
}

@observer
export class ComplexForm extends React.Component<IComplexFormProps, void> {

  @observable
  value: IComplexFormValue

  @observable
  isDirty: boolean = false

  constructor(props, context) {
    super(props, context)
    this.value = _.cloneDeep(props.value)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    this.value = _.cloneDeep(nextProps.value);
    this.isDirty = false;
    this.props.onDirtyChange && this.props.onDirtyChange(false);
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
        this.props.onDelete(this.value)
      }
    })
  }

  onChangeText = (e) => {
    this.value.text = e.target.value
  }

  render() {
    let {i18n} = this.props
    return (
      <div>
        <div>{i18n('app:title', {title: 'Title', count: 2})}</div>
        <div>{i18n('module:title', {title: 'Title', count: 2})}</div>
        <input type="text" value={this.value.text} onChange={this.onChangeText}/>
        <button onClick={this.onSave}>Save</button>
        <button onClick={this.onDelete}>Delete</button>

      </div>
    )
  }
}

export default ComplexForm