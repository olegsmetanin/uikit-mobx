/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observer} from 'mobx-react'
import {observable} from 'mobx'
import * as _ from 'lodash';
import {I18n} from '../../../../docs/src/utils/i18n/loadI18n'

export enum SelectOptions { Option1, Option2, Option3 }

export interface IComplexFormData {
  text: string;
  // checkbox: boolean;
  // combo: SelectOptions;
  // radio: SelectOptions;
  // checkedList: {name: string, checked}[]
}

export interface IComplexFormProps {
  i18n: I18n;
  data: IComplexFormData;
  onSave: (data: IComplexFormData) => void;
  onDirtyChange?: (isDirty: boolean) => void;
}

@observer
export class ComplexForm extends React.Component<IComplexFormProps, void> {

  @observable
  data: IComplexFormData

  @observable
  isDirty: boolean = false

  constructor(props, context) {
    super(props, context);
    this.data = _.cloneDeep(props.data);
  }

  onSave = () => {
    this.props.onSave(_.cloneDeep(this.data));
  }

  render() {
    let {i18n} = this.props;
    return (
      <div>
        <div>{i18n('app:title', {title: 'Title', count: 2})}</div>
        <div>{i18n('module:title', {title: 'Title', count: 2})}</div>
        <input type="text" value={this.data.text} onChange={(e) => this.data.text = e.target.value}/>
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

export default ComplexForm