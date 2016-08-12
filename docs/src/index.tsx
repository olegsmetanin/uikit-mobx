/// <reference path="./docs.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:disable:no-unused-variable */

import { render } from 'react-dom';
import Application from './Application/Application'

require('./styles/docs.scss');

window['docs'] = (options: any) => {

  const {el, initState} = options;

  render(<Application initState={initState}/>, el);

};


