import React, { Component } from 'react';
import {View,Text,TouchableOpacity,FlatList,Platform,Image,StyleSheet,ScrollView} from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import RecieverChatView from './RecieverChatView';
import SenderChatView from './SenderChatView';



export default class ChatComponent extends Component {


  constructor(props){
    super(props);
    this.arrayHolder = {};
}
  state = {
    day: '',
    month: '',
    year: '',
    date: '',
    refereshFlatList: true,
    messages: [],
    isLoggedIn: false,
    user:[],

  }


  async componentDidMount(){
    this.setTodayDateToState();
    Storage.isLoggedIn(this).then( () => {
       // alert(this.state.user.name)
    });
   // 


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

  

 


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
 



  render() {
    return (
<View style={{marginTop:40,height: responsiveHeight(85),padding:20}}>
  <SenderChatView />
  <RecieverChatView />
      </View>
    );
  }
}
