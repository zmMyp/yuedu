
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import NavigatorUtil from '../navigator/NavigatorUtil';

// 格式化代码：shift+Option+F
export default class WelcomePage extends React.Component {

    componentDidMount() {
        // 停留2秒进入主页
        this.timer = setTimeout(() => {
           NavigatorUtil.resetToHomePage(this.props);
        }, 1000);
    }

    render() {
        return (<View style={styles.container}>
            <Text>欢迎页面</Text>
        </View>)
    }

    componentWillUnmount() {

        // 注意清理定时器
        this.timer && clearTimeout(this.timer);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})