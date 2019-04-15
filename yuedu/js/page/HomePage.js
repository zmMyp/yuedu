
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';

export default class HomePage extends React.Component{

    constructor(props){
        super(props);
       
    }
    render(){
        NavigatorUtil.navigation = this.props.navigation;
       
        return(<DynamicTabNavigator/>);
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