import * as React from 'react'

import {observable} from 'lib/Reactive'
import {Link, IRouter} from 'lib/Router'
import {ClickOutside} from 'generic'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'
import {IUser} from 'application/AppAL/User/IUser'
import {IUserActions} from 'application/AppAL/User/IUserActions'

export interface INavProps {
  router: IRouter
  route: any
  systemActions: ISystemActions
  user: IUser,
  userActions: IUserActions
}

export class Nav extends React.Component<INavProps, void> {

  sub1: HTMLElement

  @observable
  submenuOpened: number | any = null

  openSubMenu = (index) => {
    if (this.submenuOpened === index) {
      this.submenuOpened = null
    } else {
      this.submenuOpened = index
    }
  }

  closeSubMenu = () => {
    this.submenuOpened = null
  }

  componentDidMount() {
    // Not working ?
    // (this.props.router as any).setRouteLeaveHook(
    //   this.props.route,
    //   this.routerWillLeave
    // )
    (this.props.router as any).listenBefore(() => {
      this.closeSubMenu()
    })
  }

  render() {
    const {router, systemActions, user, userActions} = this.props
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
              <li className={router.isActive('/simple', true) ? 'active' : ''}>
                <Link to={'/simple'}>Simple</Link>
              </li>
              <li className={router.isActive('/orders', true) ? 'active' : ''}>
                <Link to={'/orders'}>Orders</Link>
              </li>
              <li className={router.isActive('/order/0', true) ? 'active' : ''}>
                <Link to={'/order/0'}>Order/0</Link>
              </li>
              <li className={router.isActive('/order/1', true) ? 'active' : ''}>
                <Link to={'/order/1'}>Order/1</Link>
              </li>
              <li ref={(el) => this.sub1 = el} className={`${this.submenuOpened === 1 ? 'active' : ''}`} onClick={this.openSubMenu.bind(this, 1)}>
                  Submenu
                  <span className="caret caret_navbar"></span>
              </li>
              <li>
                <button onClick={() => systemActions.setLang('de')}>de</button>
                <button onClick={() => systemActions.setLang('en')}>en</button>
              </li>
              <li>
                <div>
                  user: {JSON.stringify(user)}
                </div>
                <button onClick={() => userActions.setPermissions({v: 2})}>Change permissions</button>
              </li>
            </ul>
            {this.submenuOpened === 1 && (
              <ClickOutside className="navbar-submenu" except={this.sub1} onClickOutside={this.closeSubMenu}>
                <div className="navbar-submenu__list">
                  <Link className="navbar-submenu__item" to={'/order/0'}>
                    <span className="text">Order/0</span>
                  </Link>
                  <Link className="navbar-submenu__item" to={'/'}>
                    <span className="text">Home</span>
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

export default Nav