/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 * //react-native 0.57.4
 * //react-navigation 2.18.2
 */

import {AppRegistry} from 'react-native';

import App from './js/App';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';

AppRegistry.registerComponent(appName, () => App);
