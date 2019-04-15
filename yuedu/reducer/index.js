import theme from './theme';
import{combineReducers} from 'redux';
import {rootCom, RootNavigator} from '../js/navigator/AppNavigator';

//初始状态
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

//合并
const index = combineReducers({
    nav: navReducer,
    theme: theme,
});

export default index;