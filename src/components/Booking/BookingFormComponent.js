import React, { Component } from 'react';
import {View,Text,TouchableOpacity,FlatList,Platform,Image,StyleSheet} from 'react-native';
import Base from '../../Lib/Base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//import DatePicker from 'react-native-datepicker'

export default class BookingFormComponent extends Component {


    getTodayDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = dd +  '/'+mm + '/'  + yyyy;
        return today;
      }
  render() {

      state = {
          date: '',
          time: '',
          day: '',
          month: '',
          hour: '',
          minutes: '',

      };



    return (
      <View style={{marginTop:40,}}>
          <Text
          style={{fontSize: 24,color:'black', alignSelf: 'center'}}
          >MAKE YOUR BOOKING</Text>
          
          <Text
          style={{fontSize: 18,color:'black', alignSelf: 'center'}}
          >{this.getTodayDate()}</Text>

{/* <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date}); alert(date);}}
      /> */}
          
      </View>
    );
  }
}
