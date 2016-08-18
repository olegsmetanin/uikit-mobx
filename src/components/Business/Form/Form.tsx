import * as React from 'react'

import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import * as _ from 'lodash'

export interface IErrorDescriptor {
  text: string
}

export interface IFieldErrors {
  [name: string]: {text: string}
}

export interface IForm {
  id: string
  name: string
  email: string
  errors?: IFieldErrors
}

export interface IFormProps {
  form: IForm
  onSave: (form: IForm) => void
  onDirtyChange?: (isDirty: boolean) => void
}

@observer
export class Form extends React.Component<IFormProps, void> {

  @observable
  form: IForm

  @observable
  isDirty: boolean = false

  constructor(props, context) {
    super(props, context)
    this.form = _.cloneDeep(props.form)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    this.form = _.cloneDeep(nextProps.form)
    this.isDirty = false
    // this.props.onDirtyChange && this.props.onDirtyChange(false)
  }

  @action
  onChangeName = (e) => {
    this.form.name = e.target.value
    if (!this.isDirty) {
      this.isDirty = true
      this.props.onDirtyChange && this.props.onDirtyChange(true)
    }
  }

  @action
  onChangeEmail = (e) => {
    this.form.email = e.target.value
    if (!this.isDirty) {
      this.isDirty = true
      this.props.onDirtyChange && this.props.onDirtyChange(true)
    }
  }

  @action
  onSave = () => {
    this.props.onSave(_.cloneDeep(this.form))
  }

  @action
  onCancel = () => {
    this.form = _.cloneDeep(this.props.form)
    this.isDirty = false
    this.props.onDirtyChange && this.props.onDirtyChange(false)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.form.name}
          onChange={this.onChangeName}
        />
        <input
          type="text"
          value={this.form.email}
          onChange={this.onChangeEmail}
        />
        {this.isDirty && (
            <div>
              <button onClick={this.onSave}>Save</button>
              <button onClick={this.onCancel}>Cancel</button>
            </div>
        )}
      </div>
    )
  }
}

export default Form