import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
/**
 * 趋势页面
 */
export default class TrendingPage extends React.Component {
    render() {
        return (<View style={styles.container}>
            <Text>趋势</Text>
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