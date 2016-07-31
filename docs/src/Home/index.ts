import {observer, inject} from 'mobx-react';
import {Store} from './Store';
import {Service} from './Service';
import {Actions} from './Actions';

import HomePage from './HomePage';
import ListPage from './ListPage';
import {IModule} from './IModule'
import {IAppStore} from '../AppStore'

// singleton )
let module: IModule = null;

const init = async (appStore: IAppStore) => {

  if (module) {
    return module;
  }

  let i18n = await new Promise(resolve => {
    require.ensure([], (require) => {
      const langs = ['en', 'de'];
      const lang = langs.indexOf(appStore.lang) !== -1 ? appStore.lang : 'en';

      require(`bundle?lazy!./i18n.${lang}.ts`)(i18n => resolve(i18n));
    })
  });

  const service = new Service();
  let homeStore = new Store();
  const homeActions = new Actions({store: homeStore, service: service});

  // Typed injecting
  const ConnectedHomePage = inject((allStores) => ({
    appStore: allStores.appStore as IAppStore,
    homeStore,
    homeActions,
    i18n
  }))(observer(HomePage));

  // Untyped injecting
  (ListPage as any).defaultProps = {homeStore, homeActions, i18n};
  const ConnectedListPage = inject('appStore')(observer(ListPage));

  module = {HomePage: ConnectedHomePage, ListPage: ConnectedListPage};
  return module;

};

export default init;

