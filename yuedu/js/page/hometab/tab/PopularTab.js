import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Button ,AlertIOS} from 'react-native';
import{SafeAreaView} from 'react-navigation';
import NavigatorUtil from '../../../navigator/NavigatorUtil'
/**
 * 最热页面
 */
//导航Tab组件
export default class PopularTab extends React.Component{

    render(){
       
       const {navigation}=this.props;
       const{state}=navigation;
       const{key}=state;
       
       return(
           <SafeAreaView style={styles.container}>
               <Text >{key}</Text>
               <Text >{this.props.tabLabel}</Text>
               <Button 
                    title="点击进入详情" 
                    onPress={()=>{
                      //必须使用顶层的navigation，否则跳转不行
                      NavigatorUtil.navigation.navigate('DetailPage');
                    }}
                />
                    
           </SafeAreaView>
       )
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