import React, { Component } from 'react';
import {View,Text,TouchableOpacity,FlatList,Platform,Image,StyleSheet,ScrollView} from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { ListItem } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import DialogComponent from '../Reusable/DialogComponent';


export default class MyBookingComponent extends Component {


  constructor(props){
    super(props);
    this.arrayHolder = {};
}
  state = {
    day: '',
    month: '',
    year: '',
    date: '',
    day_list: 1,
    appointments_list: [],
    refereshFlatList: true,
    days_booked: [],
    marked: null,
    dialogVisibility: false,
    timing_id: null,
    isLoggedIn: false,
    user:[],

  }


  async componentDidMount(){
    this.setTodayDateToState();
    Storage.isLoggedIn(this).then( () => {
         fetch(Base.getBaseUrl()+'user/getmyappointments?token='+this.state.user.token).then(response => response.json()).then(res => {
            if(res.isError){
                alert(res.message);
            }else if(res.isFound){
                this.setState({
                    appointments_list: res.apts,
                });
            }else {
                alert(res.message);
            }
    
        });
    });
   // 


  }




  dialogCallback = action => {
    if(action === 'cancel'){
      this.setState({
        dialogVisibility: false,
      }, () => {
        this.getSelectedDayAppointments(this.state.selectedDay,this.state.selectedMonth,this.state.selectedYear);
      })
    }else {
      this.setState({
        dialogVisibility: false,
      })
    }
  }

  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy +  '-'+mm + '-'  + dd;
    // this.setState({
    //   day: dd,
    //   month: mm,
    //   year: yyyy
    // });

    return today;
  }

  setTodayDateToState() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.setState({
      day: dd,
      month: mm,
      year: yyyy,
      selectedDay: dd,
      selectedMonth: mm,
      selectedYear: yyyy,
      scrollMonth: mm,
    });
  }



  returnDeleteBookingIcon(item){
      return (
        <Icon name='delete'
         type='material'
         color="gray"
         onPress={() => this.onDeleteIconPress(item.id)} />
      );
  }

  renderBookingDetails(item){
    return (
        <View>
            <Text>Time: {item.time_range}</Text>
            <Text>Date: {item.day}/{item.month}/{item.year}</Text>
            <Text>Cost: ${item.service_cost}</Text>
        </View>
    )
  }

  timeClickedShowDialog = id => {
    this.setState({
      dialogVisibility: !this.state.dialogVisibility,
      timing_id: id,
    });    
  }

  async onDeleteIconPress(booking){
      //alert(booking);
      await fetch(Base.getBaseUrl()+"user/deletemyappointment?token="+this.state.user.token+"&id="+booking)
      .then(response => response.json())
      .then(res => {
          if(res.isError){
              alert(res.message);
          }else if(res.isDeleted){
              this.setState({
                appointments_list: res.apts,
                refereshFlatList: !this.state.refereshFlatList,
              });
          }else {
             alert(res.message);
          }
      });
  }



  keyExtractor = (item, index) => index.toString();

  returnListItem = ({item,i}) => {
    return (
      <ListItem
        key={i}
        title={item.service_name}
        subtitle={this.renderBookingDetails(item)}
        subtitleStyle={{color: 'gray', fontSize: 13}}
        leftIcon={{name: 'av-timer'}}
        //rightIcon={{ name: 'delete', color:'gray', type:'material'}}
        rightIcon={this.returnDeleteBookingIcon(item) }
  
  
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
        // title="Chris Jackson"
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        subtitleStyle={{ color: 'gray' }}
        // subtitle="Vice Chairman"
        chevronColor="gray"
        //disabled={true}
        //chevron
        onPress={() => {
          this.timeClickedShowDialog(item.id)
        }}
      />

    
 
    );
  }



  render() {
    return (
<View style={{marginTop:40,height: responsiveHeight(90)}}>


<Text style={{alignSelf:'center', fontSize: 24,margin:6,}}>My Bookings</Text>

<FlatList
extraData={this.state.refereshFlatList}
      keyExtractor={this.keyExtractor}
      data={this.state.appointments_list}
      renderItem={this.returnListItem}
    />

{/* <DialogComponent day={this.state.selectedDay} month={this.state.selectedMonth} year={this.state.selectedYear} timing_id={this.state.timing_id} callBack={this.dialogCallback} dialogVisibility={this.state.dialogVisibility} /> */}

      </View>
    );
  }
}
