import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import NavigatorUtil from '../../../navigator/NavigatorUtil'
import PopularItem from '../../../common/cell/PopularItem';
import DataStore from '../../../dao/DataStore';
import actions from '../../../../action/index';
import { connect } from 'react-redux';
import GlobalStyles from '../../../res/styles/GlobalStyles';
import Toast from 'react-native-easy-toast'
import EventBus from "react-native-event-bus";
import EventTypes from '../../../dao/event/EventTypes';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const page_size = 8;// 默认8条
const page = 1;// 默认从第一页开始
/**
 * 最热页面
 */

//导航Tab组件
class PopularTab extends React.Component {

    constructor(props) {
        super(props);
        this.key = this.props.tabLabel;
        this.url = this.genFetchUrl(this.key);

    }

    componentDidMount() {
        // 挂载好后加载数据
        this.props.onRefreshPopular(this.url, this.key, page_size);
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            this.props.onRefreshPopular(this.url, this.key, page_size);
        })
    }
    componentWillUnmount(){
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const { popular } = this.props;
        let store = popular[this.key];
        if (!store) {
            store = {
                allItems: [],
                items: [],
                page: 1,
                isLoading: false,
                hideLoadingMore: true,//默认隐藏加载更多

            }
        }
        return store;
    }
    renderItem(item) {

        return (<PopularItem
            item={item.item}
        />)
    }
    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }
    render() {
        const { navigation } = this.props;
        const { state } = navigation;
        const { key } = state;
        let store = this._store();
       
        // <Text >{key}</Text>
        //<Text >{this.props.tabLabel}</Text>
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    keyExtractor={item => item.id + ""}
                    renderItem={item => this.renderItem(item)}
                    refreshControl={
                        <RefreshControl
                            title={'刷新'}
                            titleColor={GlobalStyles.theme.themeColor}
                            colors={[GlobalStyles.theme.themeColor]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.props.onRefreshPopular(this.url, this.key,page_size)}
                            tintColor={GlobalStyles.theme.themeColor}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        console.log('onEndReached')
                        setTimeout(() => {

                            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015

                                this.props.onLoadMorePopular(this.url,
                                    this.key,
                                    store.allItems,
                                    page_size,
                                    store.page,
                                    () => { this.refs.toast.show('没有更多了') })

                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onScrollBeginDrag={() => {
                        console.log('onScrollBeginDrag')
                        //https://www.jianshu.com/p/bf8cca0fc377  参考博客
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题

                    }}
                />
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({

    onRefreshPopular: (url, key, page_size) => dispatch(actions.onRefreshPopular(url, key, page_size)),
    onLoadMorePopular: (url, key, allItems, page_size, page, callback) => dispatch(actions.onLoadMorePopular(url, key, allItems, page_size, page, callback)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
})