import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import timediff from 'timediff';
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
        this.mTime = '0min';

    }

    calculateTimeDiff(){
        let nowTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var result = timediff(this.props.msgObj.msg_send_time, nowTime, 'YDHms');
        // console.log(result);
        var ago = '';



        if(result.years > 0){
            ago += result.years+" Years ";
        }
        
        if(result.months && result.months > 0){
            ago += result.months+" mon ";
        }

        if(result.days > 0){
            ago += result.days+' d ';

        }

        if(result.hours && result.hours > 0){
            ago += result.hours+" h ";
        }

        if(result.minutes > 0){
            ago += result.minutes+' min ';

        }else {
            ago += " 0min";
        }
        ago+=" ago";
this.mTime = ago;
        return ago;
    }

    showAlternate(action='summarryoftime'){
        if(action == 'summarryoftime'){
            this.mTime = this.calculateTimeDiff();
        }else {
            this.mTime =  this.props.msgObj.msg_send_time;
        }
    }

    async componentDidMount(){
        this.showAlternate();
    }

    render() {
        return ( 
<View style={{marginTop:20}}>
    <Text onPress={() => {
                this.showAlternate('actualtime')}}  style={{alignSelf:'flex-end',marginRight:10,fontSize:10,color:'gray'}}>{this.mTime}</Text>

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