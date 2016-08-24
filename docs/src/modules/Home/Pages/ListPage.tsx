import * as React from 'react'
import {action} from '../../../lib/Reactive'

import {IHomeState} from '../HomeAL/IHomeState'
import {IHomeActions} from '../HomeAL/IHomeActions'
import {Form} from 'components'
import {IAppState} from '../../../Application/AppAL/IAppState'

export interface IListPageProps {
  appState: IAppState
  homeState: IHomeState
  homeActions: IHomeActions
}

class ListPage extends React.Component<IListPageProps, void> {

  dirty: number[] = []

  componentDidMount() {
    this.props.homeActions.loadList()
  }

  onSave = (item) => {
    this.props.homeActions.saveItem(item)
  }

  @action
  onDirtyChange = (index, isDirty) => {
    console.log('onDirtyChange', index, isDirty)

    // if (isDirty) {
    //   if (this.dirty.indexOf(index) === -1) {
    //     this.dirty.push(index);
    //   }
    // } else {
    //   this.dirty = this.dirty.filter((v, i) => v !== index);
    // }
    // if (this.dirty.length === 0) {
    //   this.props.appStore.isDirty = false;
    // } else {
    //   this.props.appStore.isDirty = true;
    // }

  };
// onDirtyChange={this.onDirtyChange.bind(this, index)}
  render() {
    let {/*appState, */homeState} = this.props
    return (
      <div>
        <h1>ListPage {/*appState.state.isDirty && 'isDirty'*/}</h1>
        {homeState.listIsLoading && (
          <div>Loading</div>
        )}
        {homeState.list && homeState.list.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.id}. {item.name}/{item.email}</div>
              <Form form={item} onSave={this.onSave}/>
            </div>
          )
        })}


      </div>
    )
  }
}

export default ListPage
