import {observer, inject} from 'mobx-react';
import {Store} from './Store';
import {Service} from './Service';
import {Actions} from './Actions';

import HomePage from './HomePage';
import ListPage from './ListPage';
import {IModule} from './IModule';
import {IAppStore} from '../../Application/IAppStore';
import {i18n as i18nStore} from '../../utils/i18n/i18n';

// singleton )
let module: IModule = null;

const init = async (appStore: IAppStore) => {

  if (module) {
    return module;
  }

  let i18nJSON = await new Promise(resolve => {
    require.ensure([], (require) => {
      const langs = ['en', 'de'];
      const lang = langs.indexOf(appStore.lang) !== -1 ? appStore.lang : 'en';

      require(`bundle?lazy!./i18n/i18n.${lang}.json`)(i18n => resolve(i18n));
    })
  });

  //console.log('i18nJSON', i18nJSON);

  let i18n = i18nStore(i18nJSON);

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

