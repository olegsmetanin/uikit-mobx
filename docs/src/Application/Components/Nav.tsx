import * as React from 'react';

import {observable} from '../../lib/Reactive';
import {Link, IRouter} from '../../lib/Router';
import {ClickOutside} from 'components'

export interface INavProps {
  router: IRouter;
  route: any;
}

export class Nav extends React.Component<INavProps, void> {

  sub1: HTMLElement;

  @observable
  submenuOpened: number | any = null;

  openSubMenu = (index) => {
    if (this.submenuOpened === index) {
      this.submenuOpened = null;
    } else {
      this.submenuOpened = index;
    }
  };

  closeSubMenu = () => {
    this.submenuOpened = null;
  };

  componentDidMount() {
    // Not working ?
    // (this.props.router as any).setRouteLeaveHook(
    //   this.props.route,
    //   this.routerWillLeave
    // )
    (this.props.router as any).listenBefore(() => {
      this.closeSubMenu();
    })
  }

  render() {
    const router = this.props.router;
    return (
      <header className="header">
        <div className="navbar">
          <div className="navbar__item">
            <Link className={ 'logo ' + (router.isActive('/', true) ? 'active' : '')} to={'/'}>
            </Link>
          </div>
          <div className="navbar__item">
            <ul className={'main-menu'}>
              <li className={router.isActive('/', true) ? 'active' : ''}>
                <Link to={'/'}>Home</Link>
              </li>
              <li className={router.isActive('/complex', true) ? 'active' : ''}>
                <Link to={'/complex'}>ComplexForm</Link>
              </li>
              <li className={router.isActive('/list', true) ? 'active' : ''}>
                <Link to={'/list'}>List</Link>
              </li>
              <li ref={(el) => this.sub1 = el} className={`${this.submenuOpened === 1 ? 'active' : ''}`} onClick={this.openSubMenu.bind(this, 1)}>
                  Submenu
                  <span className="caret caret_navbar"></span>
              </li>
            </ul>
            {this.submenuOpened === 1 && (
              <ClickOutside className="navbar-submenu" except={this.sub1} onClickOutside={this.closeSubMenu}>
                <div className="navbar-submenu__list">
                  <Link className="navbar-submenu__item" to={'/list'}>
                    <span className="text">List</span>
                  </Link>
                  <Link className="navbar-submenu__item" to={'/'}>
                    <span className="text">Submenu1</span>
                  </Link>
                </div>
              </ClickOutside>
            )}
          </div>

          <div className="navbar__item pull-right">
            <div className="navbar-icons">
              <Link className="navbar-icons__item" to="">
                <span className="navbar-icons__icon">
                  <i className="icon icon-user"></i>
                </span>
              </Link>
              <Link className="navbar-icons__item" to="">
                <span className="navbar-icons__icon">
                  <i className="icon icon-notifications"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

    )
  }
}

export default Nav;