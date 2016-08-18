import * as React from 'react'

import {IHomeState} from '../HomeAL/IHomeState'
import {IHomeActions} from '../HomeAL/IHomeActions'
import {IAppState} from '../../../Application/AppAL/IAppState'
import {ComplexForm} from 'components'
import {ISystemActions} from '../../../Application/AppAL/System/ISystemActions'
import {IUIActions} from '../../../Application/AppAL/UI/IUIActions'

export interface IComplexFormPageProps {
  appState: IAppState
  systemActions: ISystemActions
  homeState: IHomeState
  homeActions: IHomeActions
  uiActions: IUIActions
}

class ComplexFormPage extends React.Component<IComplexFormPageProps, void> {

  componentDidMount() {
    this.props.homeActions.loadComplexFormValue()
  }

  onSave = (value) => {
    // console.log(JSON.stringify(value));
    this.props.homeActions.saveComplexFormValue(value)
  };

  render() {
    let {appState, homeState, systemActions, uiActions} = this.props
    return (
      <div>
        <h1>ComplexFormPage</h1>
        {homeState.complexFormValueIsLoading && (
          <div>Loading</div>
        )}
        {homeState.complexFormValue && (
          <div>
            <button onClick={() => appState.user.permissions = {v: 2}}>permissions</button>
            <button onClick={() => systemActions.setLang('de')}>de</button>
            <button onClick={() => systemActions.setLang('en')}>en</button>
            <ComplexForm
              value={homeState.complexFormValue}
              isSaving={homeState.complexFormValueIsSaving}
              showConfirmDialog={uiActions.showConfirmDialog}
              i18n={homeState.i18n}
              onSave={this.onSave}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ComplexFormPage
