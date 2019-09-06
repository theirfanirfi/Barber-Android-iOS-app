import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ExampleComponent from "react-rounded-image";
export default class RecieverChatView extends Component {
    state = {
        isLoggedIn: false,
        user: [],
    }

    static = {
        msgObj: PropTypes.object,
    }
    constructor(props){
        super(props);
        Storage.isLoggedIn(this);
    }
    render() {
        return ( 
            <View style={{alignSelf:'flex-start', alignItems:'flex-start',flexDirection:'row'}}>

<Image
        
        source={{uri: this.state.user.profile_image}}
        style={{width: 40, height: 40,borderRadius:20,alignSelf:'flex-start'}}
      />
<View style={style.view}>
                <Text style={style.text}>
                   {this.props.msgObj.msg}
                </Text>
</View>

           

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
    padding:10,
    margin:8,
},
text : {
    color: 'black',
}
});