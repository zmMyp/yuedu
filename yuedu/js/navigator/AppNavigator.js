
import {createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator,createSwitchNavigator, createAppContainer} from 'react-navigation'
import WelcomePage from '../page/WeclomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';
export const rootCom = 'Init';//设置根路由名称，在InitNavigator配置的第一路由，reduxer要用

const InitNavigator=createStackNavigator({
    WelcomePage:{
        screen: WelcomePage,
        navigationOptions:{
            header: null // 通过设置header null 可以把头部去掉
        }
    }
});

const MainNavigator=createStackNavigator({
    HomePage:{// Home中又使用了Tab导航
        screen: HomePage,
        navigationOptions:{
            // headerStyle: {
            //    height: 0 //适配x,把标题栏高度设为0
            // }
            header: null // 通过设置header null 可以把头部去掉
            
        }
    },
    DetailPage:{
        screen: DetailPage,
        navigationOptions:{
           
        }
    }
});



export const RootNavigator=createSwitchNavigator({
        Init:InitNavigator,
        Main: MainNavigator,
        },{
        navigationOptions:{
            header: null
        }
    });

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为createReduxContainer的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

/**
 * 2.将根导航器组件传递给 createReduxContainer 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);