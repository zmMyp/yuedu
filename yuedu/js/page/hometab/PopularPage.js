import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Button ,AlertIOS} from 'react-native';
import{createMaterialTopTabNavigator,createAppContainer,SafeAreaView} from 'react-navigation'
import NavigatorUtil from '../../../js/navigator/NavigatorUtil';

/**
 * 最热页面
 */
//导航Tab组件
class Popular extends React.Component{

    render(){
       
       const {navigation}=this.props;
       const{state}=navigation;
       const{key}=state;
       
       return(
           <SafeAreaView style={styles.container}>
               <Text >{key}</Text>
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

export default class PopularPage extends React.Component{
   
    constructor(props){
        super(props)
        console.disableYellowBox=true;//去掉黄色警告
        this.tableNames=['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
     }

     // 创建tabs
     _genTabs() {
        const tabs = {};
        //遍历数组，在tabs中拼接配置tab
        this.tableNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <Popular {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item
                }
            }
        });
        console.log(tabs);
        return tabs;
    }

    render(){
        
         //创建导航
         const TopBarNav=createMaterialTopTabNavigator(this._genTabs(),{
             tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,//是否使标签大写，默认为true
                scrollEnabled: true,//是否支持 选项卡滚动，默认false
                style: {
                    backgroundColor: '#3399ff',//TabBar 的背景颜色
                },
                indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                labelStyle: styles.labelStyle,//文字的样式
            }
         });
        //包裹导航    
        PopularAppContainer=createAppContainer(TopBarNav);

        return( 
        
          <PopularAppContainer />
        
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    
    
})