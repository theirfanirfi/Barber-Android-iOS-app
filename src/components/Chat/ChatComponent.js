import React, { Component } from 'react';
import {View,Text,TouchableOpacity,FlatList,Platform,Image,StyleSheet,ScrollView} from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon,Input } from 'react-native-elements';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import RecieverChatView from './RecieverChatView';
import SenderChatView from './SenderChatView';
import { TextInput } from 'react-native-gesture-handler';



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
    typeMessage: '',
    messages: [
      {
        id: 1,
        text: 'How are you?'
      },
      {
        id: 2,
        text: 'I am fine'
      }
    ],
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

  

 


 sendMessage = () => {
alert(this.state.typeMessage);
 }

  renderChat = ({item,i}) => {
    let renderChat = <SenderChatView msg={item.text} />
    if(item.id == 1){
      renderChat = <SenderChatView msg={item.text} />
    }else {
      renderChat = <RecieverChatView msg={item.text}  />
    }

    return (
      <View style={{ transform: [{ scaleY: -1 }]}}>
        {renderChat}
      </View>
    );

  }
 

  _keyExtractor = (item, index) => item.id+''+index;

  render() {
    return (
<View style={{marginTop:40,height: responsiveHeight(85),padding:6}}>
  <FlatList 
  keyExtractor={this._keyExtractor}
  data={this.state.messages}
  renderItem={this.renderChat}
  style={{  transform: [{ scaleY: -1 }] }}
  />

<Input
  placeholder='Type message here'
  value={this.typeMessage}
  onChangeText={(text) => this.setState({typeMessage: text})}
  rightIcon={
    <Icon
      name='send'
      type='material'
      size={24}
      color='black'
      onPress={() => this.sendMessage()}
    />
  }
/>

      </View>
    );
  }
}
