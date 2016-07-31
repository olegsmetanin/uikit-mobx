import {observer, inject} from 'mobx-react';
import {Store} from './Store';
import {Service} from './Service';
import {Actions} from './Actions';

import HomePage from './HomePage';
import FormPage from './FormPage';
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

  (HomePage as any).defaultProps = {homeStore, homeActions, i18n};
  const ConnectedHomePage = inject('appStore')(observer(HomePage));

  (FormPage as any).defaultProps = {homeStore, homeActions, i18n};
  const ConnectedFormPage = inject('appStore')(observer(FormPage));

  module = {HomePage: ConnectedHomePage, FormPage: ConnectedFormPage};
  return module;

};

export default init;

