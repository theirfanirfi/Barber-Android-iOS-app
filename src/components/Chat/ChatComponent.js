import React, { Component } from 'react';
import {View,Text,TouchableOpacity,Platform,Image,StyleSheet,ScrollView} from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon,Input } from 'react-native-elements';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import RecieverChatView from './RecieverChatView';
import SenderChatView from './SenderChatView';
import { TextInput, FlatList } from 'react-native-gesture-handler';



export default class ChatComponent extends Component {


  constructor(props){
    super(props);
    this.arrayHolder = {};
    this.timer = null;
}
  state = {
    day: '',
    month: '',
    year: '',
    date: '',
    typeMessage: '',
    refereshFlatList: true,
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
    //this.setTodayDateToState();
    Storage.isLoggedIn(this).then( () => {
      fetch(Base.getBaseUrl()+"user/chat?token="+this.state.user.token)
      .then(response => response.json())
      .then(res => {
        if(res.isError){
          alert(res.message);
        }else if(res.isFound){
          this.setState({
            messages: res.messages.reverse()
          });
        }else {
          alert(res.message);
        }
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        this.timer = setInterval(() => {
          this.getMessages();
          console.log('timer called')
        }, 4000);
      });
    });
   // 


  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  async getMessages(){
    fetch(Base.getBaseUrl()+"user/chat?token="+this.state.user.token)
    .then(response => response.json())
    .then(res => {
      if(res.isError){
        alert(res.message);
      }else if(res.isFound){
        this.setState({
          messages: res.messages.reverse(),
          refereshFlatList: !this.state.refereshFlatList,
        });
      }else {
       // alert(res.message);
      }
    })
    .catch(error => {
      alert(error);
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

  

 


async sendMessage() {
  if(this.state.isLoggedIn){
    fetch(Base.getBaseUrl()+"user/sendmsg?token="+this.state.user.token+"&msg="+this.state.typeMessage)
    .then(res => res.json())
    .then(res => {
      if(res.isError){
        alert(res.message);
      }else if(res.isSent){
        let arr = this.state.messages;
        const newArray = [res.msg].concat(arr);
        console.log(newArray);
        // arr.push(res.msg);
      
        //  console.log(res.msg);
        this.setState({
          messages: newArray,
          refereshFlatList: !this.state.refereshFlatList,
          typeMessage: ''
        }, () => {
        })


      }
    })
  }
 }

  renderChat = ({item,i}) => {
    let user_id = this.state.user.id;
    let renderChat = <SenderChatView msgObj={item}  />
    if(item.sender_id == user_id){
      renderChat = <SenderChatView msgObj={item} />
    }else {
      renderChat = <RecieverChatView msgObj={item}  />
    }

    return (
      <View style={{  transform: [{ scaleY: -1 }] }}>
        {renderChat}
      </View>
    );

  }
 

  _keyExtractor = (item, index) => item.id+''+index;

  render() {
    return (
<View style={{marginTop:40,height: responsiveHeight(85),padding:6}}>
  <FlatList 
  extraData={this.state.refereshFlatList}
  keyExtractor={this._keyExtractor}
  data={this.state.messages}
  renderItem={this.renderChat}
  style={{  transform: [{ scaleY: -1 }] }}
  />

<Input
  placeholder='Type message here'
  value={this.state.typeMessage}
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
