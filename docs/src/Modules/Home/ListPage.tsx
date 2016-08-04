/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observable, action, runInAction} from 'mobx';
import {IAppStore} from '../../Application/IAppStore';
import {Store} from './Store';
import {Form, IForm} from '../../../../src';
import {Actions} from './Actions';

export interface IListPageProps {
  appStore: IAppStore;
  homeStore: Store;
  homeActions: Actions;
}

class ListPage extends React.Component<IListPageProps, void> {

  dirty: number[] = [];

  componentDidMount() {
    this.props.homeActions.loadList();
  }

  onSave = (item) => {
    this.props.homeActions.saveItem(item);
  };

  @action
  onDirtyChange = (index, isDirty) => {
    console.log('onDirtyChange', index, isDirty);

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
    let {appStore, homeStore} = this.props;
    return (
      <div>
        <h1>ListPage {appStore.isDirty && 'isDirty'}</h1>
        {homeStore.listIsLoading && (
          <div>Loading</div>
        )}
        {homeStore.list && homeStore.list.map((item, index) => {
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

export default ListPage;
