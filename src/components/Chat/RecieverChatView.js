import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class RecieverChatView extends Component {
    render() {
        return ( 
            <View style={style.view}>
                <Text style={style.text}>
                    I am fine, and ready. What are you doing buddy?
                </Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
view: {
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    padding:12,
    margin:4,
},
text : {
    color: 'black',
}
});