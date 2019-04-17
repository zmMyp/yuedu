import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../res/styles/GlobalStyles';
/**
 * Popular页面的Item
 */
export default class PopularItem extends React.Component {


    constructor(props) {
        super(props);
        this.item = props.item;
    }
    render() {
        return (<View style={styles.container}>
            <Text numberOfLines={1} style={styles.title}>{this.item.full_name}</Text>
            <Text numberOfLines={3} style={styles.description}>
            {this.item.description?this.item.description:"暂无简介，点击查看详情"}
            </Text>
            <View style={[styles.row,styles.bottom]}>
                <View style={styles.row}>
                    <Text>Author</Text>
                    <Image
                        style={{ width: 30, height: 30,marginLeft:5 }}
                        source={{ uri: this.item.owner.avatar_url }}
                    />
                </View>
                <FontAwesome
                    name={1 === 2 ? 'star' : 'star-o'}
                    size={26}
                    style={{ color: GlobalStyles.theme.themeColor }}
                />
            </View>

        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    },
    bottom: {
        marginTop: 5
    }
})