/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observable, action, runInAction} from 'mobx';
import {Link} from 'react-router';
import {IAppStore} from '../AppStore';
import {IStore} from './Store';
import {Form, IForm} from '../../../src';
import {IActions} from './Actions';

export interface IFormPageProps {
  appStore: IAppStore;
  homeStore: IStore;
  homeActions: IActions;
}

class FormPage extends React.Component<IFormPageProps, void> {

  @observable
  form: IForm = {name: 'name', email: 'email@domain.com'};

  @observable
  isSaving: boolean = false;

  @action
  onSave = (form) => {
    this.form = form;
  };

  render() {
    return (
      <div>
        <h1>FormPage</h1>

        <Form form={this.form} isSaving={this.isSaving} onSave={this.onSave}/>
      </div>
    )
  }
}

export default FormPage;
