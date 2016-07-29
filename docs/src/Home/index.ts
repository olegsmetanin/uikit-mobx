import {observer, inject} from 'mobx-react';
import Store from './Store';
import HomePage from './HomePage';
import FormPage from './FormPage';

import Service from './Service';

const service = new Service();
let homeStore = new Store({service: service});

(HomePage as any).defaultProps = {homeStore: homeStore};
const ConnectedHomePage = inject('appStore')(observer(HomePage));

(FormPage as any).defaultProps = {homeStore: homeStore};
const ConnectedFormPage = inject('appStore')(observer(FormPage));

export default {
  ConnectedHomePage,
  ConnectedFormPage
};