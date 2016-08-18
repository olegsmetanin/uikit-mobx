import * as React from 'react';

import {IHomeState, IHomeActions} from '../HomeAL';
import {IAppState} from '../../../Application/AppAL'
import {ComplexForm} from 'components'
import {ISystemActions} from '../../../Application/AppAL/System'

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
    // console.log(JSON.stringify(data));
    // this.props.homeActions.saveItem(item);
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
            <button onClick={() => appState.user.permissions = {v: 2}}>permissions</button>
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
