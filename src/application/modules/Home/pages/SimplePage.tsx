/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {IHomeState} from '../HomeAL/IHomeState'
import {IHomeActions} from '../HomeAL/IHomeActions'
import {IAppState} from 'application/AppAL/IAppState'
import {ISystemActions} from 'application/AppAL/System/ISystemActions'

/**
 * Home page for app
 */

export const SimplePage = ({
    i18n,
    layoutWidth
  }: {
    i18n: any,
    layoutWidth: any
  }) => (
    <div>
      <h1>Simple Page</h1>
      <div>Page width: {layoutWidth}</div>
      <div> i18n app: {i18n('app:title', {title: 'Title', count: 2})}</div>
      <div> i18n mod: {i18n('module:title', {title: 'Title', count: 2})}</div>
    </div>
)

