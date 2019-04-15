import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class DetailPage extends React.Component {

   render() {
        return (<View style={styles.container}>
            <Text>详情页面</Text>
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