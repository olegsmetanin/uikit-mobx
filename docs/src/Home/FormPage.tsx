/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observable, action, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Container, ContainerWidth} from '../../../src';
import {Link} from 'react-router';
import IAppStore from '../IAppStore';
import {IStore} from './Store';
import Form, {IForm} from './Form';

interface IFormPageProps extends React.Props<FormPage> {
  appStore: IAppStore;
  homeStore: IStore;
}

class FormPage extends React.Component<IFormPageProps, void> {

  @observable
  form: IForm = {name: 'name', email: 'email@domain.com'};

  @observable
  isSaving: boolean = false;

  @action
  onSave = (form) => {
    this.form = form;
  }

  render() {
    return (
      <div>
        <h1>FormPage</h1>

        <div>
          <Link to="/">Home</Link>
        </div>

        <Form form={this.form} isSaving={this.isSaving} onSave={this.onSave}/>
      </div>
    )
  }
}

export default FormPage;
