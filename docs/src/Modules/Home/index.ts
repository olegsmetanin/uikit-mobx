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
import {ISystemActions} from '../../Application/AppAL/System/interfaces'
import {reaction} from 'mobx'

// singleton )
let module: IHomeModule = null;

const init = async ({appState, userActions, systemActions}: {appState: IAppState, userActions: IUserActions, systemActions: ISystemActions}) => {

  if (module) {
    return module;
  }

  const service = new HomeService();
  let homeState = new HomeState();
  const homeActions = new HomeActions({state: homeState, service: service});

  await homeActions.loadLang(appState.system.lang);

  reaction(() => appState.system && appState.system.lang, lang => homeActions.loadLang(lang));

  // Typed injecting
  const ConnectedHomePage = inject((allAL) => ({
    appState: allAL.appState as IAppState, // inject from context
    userActions: userActions,              // inject from module arg
    homeState,
    homeActions,
    systemActions
  }))(observer(HomePage));

  // Untyped injecting
  (ListPage as any).defaultProps = {homeState, homeActions, systemActions};
  const ConnectedListPage = inject('appState')(observer(ListPage));

  module = {HomePage: ConnectedHomePage, ListPage: ConnectedListPage};
  return module;

};

export default init;

