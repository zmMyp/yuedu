import React, {PropTypes} from "react";
import {BackHandler} from "react-native";


export default class BackPressComponent extends React.Component{

    constructor(props){
        super(props);
        this.props=props;
    }
    componentDidMount(){
       BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }


    handleBackPress = (e) => {
        //回调传来的返回处理函数
        this.props.backPress(e);
    }
}