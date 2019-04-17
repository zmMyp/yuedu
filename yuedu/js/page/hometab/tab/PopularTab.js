import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import NavigatorUtil from '../../../navigator/NavigatorUtil'
import PopularItem from '../../../common/cell/PopularItem';
import DataStore from '../../../dao/DataStore';
import actions from '../../../../action/index';
import { connect } from 'react-redux';
import GlobalStyles from '../../../res/styles/GlobalStyles';



const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

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
        this.props.onRefreshPopular(this.url,this.key);
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
                items: [],
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

    render() {
        const { navigation } = this.props;
        const { state } = navigation;
        const { key } = state;
        let store = this._store();
        console.log(key + "-->" + JSON.stringify(store.items));
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
                            onRefresh={() => this.props.onRefreshPopular(this.url,this.key)}
                            tintColor={GlobalStyles.theme.themeColor}
                        />
                    }
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({

    onRefreshPopular: (url,key) => dispatch(actions.onRefreshPopular(url,key)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})