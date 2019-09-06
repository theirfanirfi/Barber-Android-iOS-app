import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ExampleComponent from "react-rounded-image";
export default class SenderChatView extends Component {

    static = {
        msgObj: PropTypes.object,
    }
    state = {
        isLoggedIn: false,
        user: [],
    }
    constructor(props){
        super(props);
        Storage.isLoggedIn(this);
    }
    render() {
        return ( 

            <View style={{alignSelf:'flex-end', alignItems:'flex-end',flexDirection:'row'}}>

          
<View style={style.view}>

                <Text style={style.text}>
                    {this.props.msgObj.msg}
                </Text>

                
</View>
                <Image
        
        source={{uri: this.state.user.profile_image}}
        style={{width: 40, height: 40,borderRadius:20,alignSelf:'flex-end'}}
      />
           

            </View>

        );
    }
}

const style = StyleSheet.create({
view: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flexDirection:'row',
    backgroundColor: 'blue',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    padding: 10,
    margin: 8,
},
text : {

    color: 'white',
}
});