import {reaction, observer, inject} from 'lib/Reactive'
import {HomeState} from './HomeAL/HomeState';
import {HomeService} from './HomeAL/HomeService';
import {HomeActions} from './HomeAL/HomeActions';

import HomePage from './Pages/HomePage';
import ListPage from './Pages/ListPage';
import {IHomeModule} from './IHomeModule';

import {IAppState} from '../../Application/AppAL'
import {IUserActions} from '../../Application/AppAL/User'
import {ISystemActions} from '../../Application/AppAL/System'
import ComplexFormPage from './Pages/ComplexFormPage'

// singleton )
let module: IHomeModule = null;

const init = async ({appState, userActions, systemActions}: {appState: IAppState, userActions: IUserActions, systemActions: ISystemActions}) => {

  if (module) {
    return module;
  }

  const service = new HomeService();
  let homeState = new HomeState();
  const homeActions = new HomeActions({state: homeState, service: service});

  await homeActions.loadLang(appState.system.lang, () => appState.i18n);

  reaction(() => appState.system && appState.system.lang, lang => homeActions.loadLang(lang, () => appState.i18n));

  const ConnectedHomePage = inject(() => ({
    appState,
    userActions,
    homeState,
    homeActions,
    systemActions
  }))(observer(HomePage));

  const ConnectedListPage = inject(() => ({appState, homeState, homeActions, systemActions}))(observer(ListPage));

  const ConnectedComplexFormPage = inject(() => ({appState, homeState, homeActions, systemActions}))(observer(ComplexFormPage));

  module = {HomePage: ConnectedHomePage, ListPage: ConnectedListPage, ComplexFormPage: ConnectedComplexFormPage};
  return module;

};

export default init;

