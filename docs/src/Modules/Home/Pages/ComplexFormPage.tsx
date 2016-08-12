/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observable, action, runInAction} from 'mobx';
import {IHomeState, IHomeActions} from './../HomeAL/interfaces';
import {Form, IForm} from '../../../../../src';
import {IAppState} from '../../../Application/AppAL/interfaces'
import {IComplexFormData, ComplexForm} from '../../../../../src/ComplexForm/ComplexForm'
import {ISystemActions} from '../../../Application/AppAL/System/interfaces'

export interface IComplexFormPageProps {
  appState: IAppState;
  systemActions: ISystemActions;
  homeState: IHomeState;
  homeActions: IHomeActions;
}

class ComplexFormPage extends React.Component<IComplexFormPageProps, void> {

  componentDidMount() {
    this.props.homeActions.loadComplexFormData();
  }

  onSave = (data) => {
    //console.log(JSON.stringify(data));
    //this.props.homeActions.saveItem(item);
  };

  render() {
    let {appState, homeState, systemActions} = this.props;
    return (
      <div>
        <h1>ComplexFormPage</h1>
        {homeState.complexFormDataIsLoading && (
          <div>Loading</div>
        )}
        {homeState.complexFormData && (
          <div>
            <button onClick={() => systemActions.setLang('de')}>de</button>
            <button onClick={() => systemActions.setLang('en')}>en</button>
            <ComplexForm data={homeState.complexFormData} i18n={homeState.i18n} onSave={this.onSave}/>
          </div>
        )}
      </div>
    )
  }
}

export default ComplexFormPage;
