import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class SenderChatView extends Component {
    render() {
        return ( 
            <View style={style.view}>
                <Text style={style.text}>
                    How are you buddy? are you ready?
                </Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
view: {
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'blue',
    borderRadius: 30,
    borderBottomRightRadius: 0,
    padding: 12,
    margin: 4,
},
text : {
    color: 'white',
}
});