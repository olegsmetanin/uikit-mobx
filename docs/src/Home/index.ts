import {observer, inject} from 'mobx-react';
import Store from './Store';
import HomePage from './HomePage';

let homeStore = new Store();

(HomePage as any).defaultProps = {homeStore: homeStore};
const ConnectedHomePage = inject('appStore')(observer(HomePage));

export default {
  ConnectedHomePage
};