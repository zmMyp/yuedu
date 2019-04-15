import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
/**
 * 我的页面
 */
export default class MinePage extends React.Component {
    render() {
        return (<View style={styles.container}>
            <Text>我的页面</Text>
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