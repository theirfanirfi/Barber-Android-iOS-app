import React, { Component } from 'react';
import {View,Text} from 'react-native'
import Dialog from "react-native-dialog";
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'apsl-react-native-button'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import Base from '../../Lib/Base';

export default class DilogComponent extends Component {
    constructor(props){
        super(props);
        this.arrayHolder = [];
    }


    static = {
        dialogVisibility: PropTypes.bool,
        callBack: PropTypes.func,
    };

    state = {
        dialogVisibility: false,
        services: [],
        services_names: [],
        selectedService: '',
        data: [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
            id: 22,
          }]
    }

    async book() {
        fetch(Base.getBaseUrl()+"user/bookappointment?day="+this.state.day+
        "&month="+this.state.month+
        "&year="+this.state.year+
        "&time="+this.state.time+"&token=$2y$10$ryl9Vkt5jec5nvX7cNtPT.JFhacP3XihySlc9LXOi4jUYpWQX4mWe&service_id=1")
        .then((res) => res.json()).then(response => {
          console.log(response);
        });
        //alert(this.state.day+ " : "+this.state.month+" : "+this.state.year+" : "+this.state.time);
      }

      cancelBooking = () => {
        this.props.callBack('cancel');
      }

      async componentDidUpdate(){
        if(this.props.dialogVisibility){
            fetch(Base.getBaseUrl()+"user/getservices")
            .then(response => response.json())
            .then(res => {
                if(res.isFound){
                    let arr = [];
                    res.services.forEach((e,i) => {
                       // console.log(e.service_name);
                    arr.push({'value': e.service_name});
                    });
                   // console.log(arr);

                    this.setState({
                        services: res.services,
                        services_names: arr,
                    })
                }else {
                    alert('The barber does not offer any serives.');
                    // this.setState({
                    //     dialogVisibility: false
                    // })
                }
            });
        }
    
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
          containerStyle={{width:'95%',alignSelf:'center'}}
        label='Pick a service'
        itemTextStyle={{alignSelf:'center',alignItems:'center'}}
        overlayStyle={{alignSelf:'center'}}
        data={this.state.services_names}
        onChangeText={(text,index) => {
            this.setState({
                selectedService: text,
            })
        }}
       
      />

<Button onPress={() => this.book()} style={{ backgroundColor: '#34D27C', marginTop:responsiveHeight(2),width: responsiveWidth(50),alignSelf:'center',color:'#fff'}} textStyle={{fontSize: 18}}>
<Text style={{ color:'#fff' }}> Book Appointment</Text>
</Button>
        </Dialog.Container>
    </View>
    );
  }
}
