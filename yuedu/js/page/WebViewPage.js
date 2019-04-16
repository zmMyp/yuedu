import React, { Component } from 'react';
import { WebView } from 'react-native'
import BackPressComponent from '../common/BackPressComponent';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import GlobalStyles from '../res/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';

export default class WebViewPage extends React.Component {

    constructor(props) {
        super(props);
        //这句话的意思表示可以从路由中获得uri则用路由中的uri,否则使用属性中传来的
        this.uri = this.props.navigation.getParam('uri', 'https://baidu.com') || this.props.uri;
        this.title = this.props.navigation.getParam('title', '') || this.props.title;
        //注意此处通过构造函数传递属性
        this.backPress = new BackPressComponent({
            backPress: () => this.backPress()
        });

        this.state = {
            title: this.title,
            canGoBack: false,
            url: this.uri,
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount();
    }
    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        />;

        return (
            <SafeAreaViewPlus
                topColor={GlobalStyles.theme.themeColor}
                topInset={false}
            >
                {navigationBar}
                <WebView
                    ref={webview => this.webview = webview}
                    startInLoadingState={true}
                    source={{ uri: this.state.url }}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                />
            </SafeAreaViewPlus>)
    }

    // 导航变化时调用
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    // 返回键处理    
    backPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webview.goBack();
        } else {

            NavigationUtil.goBack(this.props.navigation);
        }
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
}