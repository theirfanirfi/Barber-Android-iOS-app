import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, Picker } from 'react-native';
import Base from '../../Lib/Base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown-v2';
import Button from 'apsl-react-native-button'
import { Icon } from 'react-native-elements'

export default class BookingFormComponent extends Component {

  state = {
    date: "",
    time: '14:15',
    day: '',
    month: '',
    hour: '',
    minutes: '',
    isDateTimePickerVisible: false,
    serviceSelected: 'Hair cut',

    data: [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
      id: 22,
    }]
  };

  async book() {
    fetch(Base.getBaseUrl() + "user/bookappointment?day=" + this.state.day +
      "&month=" + this.state.month +
      "&year=" + this.state.year +
      "&time=" + this.state.time + "&token=$2y$10$ryl9Vkt5jec5nvX7cNtPT.JFhacP3XihySlc9LXOi4jUYpWQX4mWe&service_id=1")
      .then((res) => res.json()).then(response => {
        console.log(response);
      });
    //alert(this.state.day+ " : "+this.state.month+" : "+this.state.year+" : "+this.state.time);
  }

  componentDidMount() {
    var day = this.props.navigation.getParam('day');
    var month = this.props.navigation.getParam('month');
    var year = this.props.navigation.getParam('year');

    this.setState({
      date: this.getTodayDate(),
      day: day,
      month: month,
      year: year,
    });
  }

  returnPickerItem() {
    let items = this.state.services.map((element, index) => {
      return (
        <Picker.Item label={element} value={element} key={index} />
      )

    });
    return items;
  }
  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1, }}>
        <View>
          <Text
            style={{ fontSize: 24, color: 'black', alignSelf: 'center' }}
          >MAKE YOUR BOOKING</Text>

          <Text
            style={{ fontSize: 18, color: 'black', alignSelf: 'center' }}
          >{this.getTodayDate()}</Text>



          <Text style={{ alignSelf: 'center', marginTop: 8, }}>Pick Time</Text>

          <DatePicker
            style={{ width: '95%', margin: 12, alignSelf: 'center', }}
            date={this.state.time}
            mode="time"
            placeholder="select time"
            format="hh:mm a"
            //minDate="01-05-2019"
            // maxDate="01-06-2020"
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
            onDateChange={(time) => { this.setState({ time: time }); console.log(time) }}

          />

          <Dropdown
            containerStyle={{ width: '95%', alignSelf: 'center' }}
            label='Pick a service'
            itemTextStyle={{ alignSelf: 'center', alignItems: 'center' }}
            overlayStyle={{ alignSelf: 'center' }}
            data={this.state.data}
            onChangeText={(text, index, id) => console.log(text)}
          />

          <Button onPress={() => this.book()} style={{ backgroundColor: '#34D27C', marginTop: responsiveHeight(2), width: responsiveWidth(50), alignSelf: 'center', color: '#fff' }} textStyle={{ fontSize: 18 }}>
            <Text style={{ color: '#fff' }}> Book Appointment</Text>
          </Button>
        </View>
      </View>
    );
  }
}
