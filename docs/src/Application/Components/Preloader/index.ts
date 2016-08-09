import {observer} from 'mobx-react';
import Preloader from './Preloader';

const ConnectedPreloader = (observer(Preloader));

export default ConnectedPreloader;