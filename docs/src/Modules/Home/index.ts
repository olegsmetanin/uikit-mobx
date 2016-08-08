import {observer, inject} from 'mobx-react';
import {HomeState} from './HomeAL/HomeState';
import {HomeService} from './HomeAL/HomeService';
import {HomeActions} from './HomeAL/HomeActions';

import HomePage from './Pages/HomePage';
import ListPage from './Pages/ListPage';
import {IModule} from './IModule';

import {i18n as i18nStore} from '../../utils/i18n/i18n';
import {IAppState} from '../../Application/AppAL/interfaces'
import {IUserActions} from '../../Application/AppAL/User/interfaces'

// singleton )
let module: IModule = null;

const init = async ({appState, userActions}: {appState: IAppState, userActions: IUserActions}) => {

  if (module) {
    return module;
  }

  let i18nJSON = await new Promise(resolve => {
    require.ensure([], (require) => {
      const langs = ['en', 'de'];
      const lang = langs.indexOf(appState.user.lang) !== -1 ? appState.user.lang : 'en';

      require(`bundle?lazy!./i18n/i18n.${lang}.json`)(i18n => resolve(i18n));
    })
  });

  let i18n = i18nStore(i18nJSON);

  const service = new HomeService();
  let homeState = new HomeState();
  const homeActions = new HomeActions({state: homeState, service: service});

  // Typed injecting
  const ConnectedHomePage = inject((allAL) => ({
    appState: allAL.appState as IAppState, // inject from context
    userActions: userActions,              // inject from module arg
    homeState,
    homeActions,
    i18n
  }))(observer(HomePage));

  // Untyped injecting
  (ListPage as any).defaultProps = {homeState, homeActions, i18n};
  const ConnectedListPage = inject('appState')(observer(ListPage));

  module = {HomePage: ConnectedHomePage, ListPage: ConnectedListPage};
  return module;

};

export default init;

