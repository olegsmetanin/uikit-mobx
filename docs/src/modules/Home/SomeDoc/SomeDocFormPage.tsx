import * as React from 'react'

import {IHomeState} from '../HomeAL/IHomeState'
import {IHomeActions} from '../HomeAL/IHomeActions'
import {IAppState} from '../../../Application/AppAL/IAppState'
import {SomeDocForm} from 'components'
import {ISystemActions} from '../../../Application/AppAL/System/ISystemActions'
import {IUIActions} from '../../../Application/AppAL/UI/IUIActions'
import {ISomeDocActions} from './ISomeDocActions'
import {ISomeDocState} from './ISomeDocState'
import {observable} from 'lib/Reactive'

export interface ISomeDocFormPage {
  appState: IAppState
  systemActions: ISystemActions
  homeState: IHomeState
  homeActions: IHomeActions
  uiActions: IUIActions
  someDocActions: ISomeDocActions
  someDocState: ISomeDocState
  params: {id: string}
  router: any
  route: any
}

export class SomeDocFormPage extends React.Component<ISomeDocFormPage, void> {

  @observable
  isDirty: boolean = false

  componentDidMount() {
    this.props.someDocActions.get(this.props.params.id)
    this.props.router.setRouteLeaveHook(
      this.props.route,
      () => {
        if (this.isDirty) {
          return 'You have unsaved information, are you sure you want to leave this page?'
          // this.props.uiActions.showConfirmDialog({
          //   body: (
          //     <div>
          //       You have unsaved information, are you sure you want to leave this page?
          //     </div>
          //   ),
          //   onConfirm: () => {
          //     this.props.onDelete(_.cloneDeep(this.value))
          //   }
          // })
        }
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.someDocActions.get(nextProps.params.id)
    }
  }

  onSave = (value) => {
    this.props.someDocActions.update(value)
  }

  onDelete = async (value) => {
    await this.props.someDocActions.delete(this.props.params.id)
    this.props.systemActions.goto('/')
  }

  onDirtyChange = (isDirty) => {
    this.props.uiActions.setDirty(isDirty)
  }

  render() {
    let {homeState, uiActions, someDocState} = this.props
    return (
      <div>
        <div>SomeDocFormPage</div>
        {someDocState.isLoading && (
          <div>Loading</div>
        )}
        {someDocState.value && (
          <SomeDocForm
            value={someDocState.value}
            isSaving={someDocState.isSaving}
            isDeleting={someDocState.isDeleting}
            showConfirmDialog={uiActions.showConfirmDialog}
            i18n={homeState.i18n}
            onSave={this.onSave}
            onDelete={this.onDelete}
            onDirtyChange={this.onDirtyChange}
          />
        )}
        <div>someDocState: {JSON.stringify(someDocState)}</div>
      </div>

    )
  }

}

export default SomeDocFormPage
