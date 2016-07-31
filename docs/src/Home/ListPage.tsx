/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import {observable, action, runInAction} from 'mobx';
import {IAppStore} from '../AppStore';
import {Store} from './Store';
import {Form, IForm} from '../../../src';
import {Actions} from './Actions';

export interface IListPageProps {
  appStore: IAppStore;
  homeStore: Store;
  homeActions: Actions;
}

class ListPage extends React.Component<IListPageProps, void> {

  componentDidMount() {
    this.props.homeActions.loadList();
  }

  onSave = (item) => {
    this.props.homeActions.saveItem(item);
  };

  render() {
    let {homeStore} = this.props;
    return (
      <div>
        <h1>ListPage</h1>
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
