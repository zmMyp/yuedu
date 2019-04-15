import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Button } from 'react-native';
import action from '../../../action'
import {connect} from "react-redux";
/**
 * 收藏页面
 */
class FavoritorPage extends React.Component {
    render() {
        return (<View style={styles.container}>
            <Text>收藏</Text>
            <Button
                    title="改变主题色"
                    onPress={() => {
                        this.props.onThemeChange('#206')
                    }}
                />
        </View>)
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(action.onThemeChange(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoritorPage);