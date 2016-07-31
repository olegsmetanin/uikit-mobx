/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import * as _ from 'lodash';

export interface IErrorDescriptor {
  text: string;
}

export interface IFieldErrors {
  [name: string]: {text: string};
}

export interface IForm {
  id: string;
  name: string;
  email: string;
  errors?: IFieldErrors;
}

export interface IFormProps {
  form: IForm;
  onSave: (form: IForm) => void;
}

@observer
export class Form extends React.Component<IFormProps, void> {

  @observable
  form: IForm;

  @observable
  isDirty: boolean = false;

  constructor(props, context) {
    super(props, context);
    this.form = _.cloneDeep(props.form);
  }

  componentWillReceiveProps(nextProps) {
    this.form = _.cloneDeep(nextProps.form);
    this.isDirty = false;
  }

  @action
  onChangeName = (e) => {
    this.form.name = e.target.value;
    this.isDirty = true;
  }

  @action
  onChangeEmail = (e) => {
    this.form.email = e.target.value;
    this.isDirty = true;
  }

  @action
  onSave = () => {
    this.props.onSave(_.cloneDeep(this.form));
  }

  @action
  onCancel = () => {
    this.form = _.cloneDeep(this.props.form);
    this.isDirty = false;
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
        {this.isDirty
          ? (
            <div>
              <button onClick={this.onSave}>Save</button>
              <button onClick={this.onCancel}>Cancel</button>
            </div>
          )
          : null
        }
      </div>
    )
  }
}

export default Form;