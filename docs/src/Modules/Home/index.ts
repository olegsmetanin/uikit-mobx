import {observer, inject} from 'mobx-react';
import {HomeState} from './HomeAL/HomeState';
import {HomeService} from './HomeAL/HomeService';
import {HomeActions} from './HomeAL/HomeActions';

import HomePage from './Pages/HomePage';
import ListPage from './Pages/ListPage';
import {IHomeModule} from './IHomeModule';

import {loadI18n} from '../../utils/i18n/loadI18n';
import {IAppState} from '../../Application/AppAL/interfaces'
import {IUserActions} from '../../Application/AppAL/User/interfaces'

// singleton )
let module: IHomeModule = null;

const init = async ({appState, userActions}: {appState: IAppState, userActions: IUserActions}) => {

  if (module) {
    return module;
  }

  const lang = ['en', 'de'].indexOf(appState.user.lang) !== -1 ? appState.user.lang : 'en';
  let i18n = await loadI18n(require(`bundle?lazy!./i18n/i18n.${lang}.json`));

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

