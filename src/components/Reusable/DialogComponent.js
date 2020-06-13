import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native'
import Dialog from "react-native-dialog";
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'apsl-react-native-button'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
export default class DilogComponent extends Component {
  constructor(props) {
    super(props);
    this.arrayHolder = [];
  }


  static = {
    dialogVisibility: PropTypes.bool,
    callBack: PropTypes.func,
    timing_id: PropTypes.string,
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
  };

  state = {
    dialogVisibility: false,
    services: [],
    services_names: [],
    selectedService: '',
    service_cost: '',
    selectedServiceId: 0,
    isLoggedIn: false,
    user: [],
    timing_id: null,
  }

  alertInfo = (title, msg, btn) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: btn,
          onPress: () => this.cancelBooking(),
          style: 'cancel',
        }
      ],
      { cancelable: false },
    );
  }

  async book() {

    if (this.state.isLoggedIn) {
      // alert(this.props.day+ " : "+this.props.month+" : "+this.props.year+" : "+this.props.timing_id+" : "+this.state.selectedServiceId);

      fetch(Base.getBaseUrl() + "user/bookappointment?day=" + this.props.day +
        "&month=" + this.props.month +
        "&year=" + this.props.year +
        "&time=" + this.props.timing_id + "&token=" + this.state.user.token + "&service_id=" + this.state.selectedServiceId)
        .then((res) => res.json()).then(response => {
          if (response.isError) {
            alert(response.message);
          } else if (response.isAlreadyTaken) {
            this.alertInfo("Sorry", response.message, "Cancel");
          } else if (response.isBooked) {
            this.alertInfo("Success", response.message, "Ok");

          } else {
            alert(response.message);
          }
        });

    } else {
      alert("Please login to continue.");
    }

  }

  cancelBooking = () => {
    this.props.callBack('cancel');
  }

  async componentDidUpdate() {
    if (this.props.dialogVisibility) {

    }

  }
  async componentDidMount() {
    Storage.isLoggedIn(this);
    fetch(Base.getBaseUrl() + "user/getservices")
      .then(response => response.json())
      .then(res => {
        if (res.isFound) {
          let arr = [];
          res.services.map((e, i) => {
            // console.log(e.service_name);
            arr.push({ 'value': e.service_name, 'id': e.id, 'cost': e.service_cost });
          });
          console.log(arr);

          this.setState({
            services: res.services,
            services_names: arr,
          });

        } else {
          // alert('The barber does not offer any serives.');
          // this.setState({
          //     dialogVisibility: false
          // })
        }
      });
  }

  render() {
    return (
      <View>
        <Dialog.Container visible={this.props.dialogVisibility}>
          <Dialog.Title>Book</Dialog.Title>
          <Dialog.Description>
            Select Service
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.cancelBooking} />

          <Dropdown
            containerStyle={{ width: responsiveWidth(50), alignSelf: 'center' }}
            label='Pick a service'
            itemTextStyle={{ alignSelf: 'center', alignItems: 'center' }}
            overlayStyle={{ alignSelf: 'center' }}
            data={this.state.services_names}
            onChangeText={(value, index, cost) => {
              //console.log(cost[index].cost);
              this.setState({
                selectedService: value,
                selectedServiceId: cost[index].id,
                service_cost: cost[index].cost,
              })
            }}

          />
          <Text style={{ alignSelf: 'center' }}>Cost: {this.state.service_cost}$s</Text>
          <Button onPress={() => this.book()} style={{ backgroundColor: '#34D27C', marginTop: responsiveHeight(2), width: responsiveWidth(50), alignSelf: 'center', color: '#fff' }} textStyle={{ fontSize: 18 }}>
            <Text style={{ color: '#fff' }}> Book Appointment</Text>
          </Button>
        </Dialog.Container>
      </View>
    );
  }
}
