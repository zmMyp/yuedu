import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import PopularPage from '../page/hometab/PopularPage';
import FavoritorPage from '../page/hometab/FavoritorPage';
import MinePage from '../page/hometab/MinePage';
import TrendingPage from '../page/hometab/TrendingPage';
import WebViewPage from '../page/WebViewPage';
import NavigatorUtil from '../navigator/NavigatorUtil';
import { connect } from "react-redux";
import { BottomTabBar } from 'react-navigation-tabs';

// 定义配置的底部tab
const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "github",
            tabBarIcon: ({ tintColor, focused }) => {
                return <MaterialIcons
                    name={"whatshot"}
                    size={26}
                    style={{ color: tintColor }}
                />
            }
        }
    },
    TrendingPage: {
        screen: WebViewPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "知乎",
            tabBarIcon: ({ tintColor, focused }) => {
                return <Ionicons
                    name={"md-trending-up"}
                    size={26}
                    style={{ color: tintColor }}
                />
            },
            tabBarOnPress: () => { // 使用tabBarOnPress点击事件来传递参数给下一页
                if (!navigation.isFocused()) {
                    // 路由方法, 动态跳转到对应界面
                    navigation.navigate(navigation.state.routeName, {
                        uri: "https://www.zhihu.com",
                        title: '知乎'
                    })
                }
            }

        })
    },
    FavoritorPage: {
        screen: WebViewPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "掘金",
            tabBarIcon: ({ tintColor, focused }) => {
                return <MaterialIcons
                    name={"favorite"}
                    size={26}
                    style={{ color: tintColor }}
                />
            },
            tabBarOnPress: () => { // 使用tabBarOnPress点击事件
                if (!navigation.isFocused()) {
                    // 路由方法, 动态跳转到对应界面
                    navigation.navigate(navigation.state.routeName, {
                        uri: "https://juejin.im",
                        title: '掘金'
                    })
                }
            }
        }),

    },
    MinePage: {
        screen: MinePage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ tintColor, focused }) => {
                return <Entypo
                    name={"user"}
                    size={26}
                    style={{ color: tintColor }}
                />
            }
        }
    },

}
class DynamicTabNavigator extends React.Component {

    //初始化属性值
    static defaultProps = {
        theme: '#0099ff',
    };

    constructor(props) {
        super(props)
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        const { PopularPage, TrendingPage, FavoritorPage, MinePage } = TABS;
        const tabs = { PopularPage, TrendingPage, FavoritorPage, MinePage };//根据需要定制显示的tab
        //PopularPage.navigationOptions.tabBarLabel = '哈哈';//动态配置Tab属性
        return tabs;
    }
    render() {
        //记录顶层的导航，便于后面的子导航使用
        const TabNav = createBottomTabNavigator(this._tabNavigator(), {
            tabBarComponent: props => {
                return <TabBarComponent theme={this.props.theme} {...props} />
            }
        });
        const HomeTabContainer = createAppContainer(TabNav);

        return (<HomeTabContainer />);
    }
}


// 底部导航的组件
class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);