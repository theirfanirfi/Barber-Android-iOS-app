import React, { Component } from 'react'
import {View,StyleSheet,Text,FlatList,Platform,TouchableOpacity,TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FormInput from '../Reusable/FormInput';
import MainToolbar from '../Toolbar/MainToolbar';
import IOSToolbar from '../Toolbar/IOSToolbar';
import Button from 'apsl-react-native-button';
import Storage from '../../Lib/Storage';
import Base from '../../Lib/Base';
import Req from '../../Requests/ReqLib';
export default class LoginDetailsComponent extends Component {
    state = {
        fullname: '',
        email: '',
        isLoggedIn: false,
        user: []
    }

    static navigationOptions = {
        headerTitle: 'Login Details',
    }

    callBack = (which,text) => {
        if(which === 'fullname'){
            this.setState({'fullname':text});

        }else if(which === 'email'){
            this.setState({'email':text});
        }
    }

    async componentDidMount(){
        await Storage.isLoggedIn(this);
        if(this.state.isLoggedIn){
            console.log(this.state.user.token);
            this.setState({'email': this.state.user.email, 'fullname': this.state.user.name,'user': this.state.user});
        }else {
            alert('You are not logged in.');
        }
    }

    async updateProfileDetails() {
        if(this.state.isLoggedIn){
          // console.log(this.state.email);
            return fetch(Base.getBaseUrl()+'user/updateprofile?token='+this.state.user.token+'&email='+this.state.email+'&name='+this.state.fullname).then(res => res.json())
          .then(response => {
              if(response.isError){
                  alert(response.message);
              }else if(response.isUpdated){
                  Storage.updateUser(this,response.user);
                alert(response.message);
              }
          });

        }else {
            alert('You are not logged in.');
        }
    }

    render() {
        const osBasedToolbar = Platform.OS === 'android' ? <MainToolbar title="Login Details" /> : <IOSToolbar title="Login Details"/>;

        return (
            <View>
                {/* {osBasedToolbar} */}
                <View style={{ justifyContent:'center', alignContent:'center' }}>
                <FormInput callBack={this.callBack} placeholder="Full name" value={this.state.fullname} />
                <FormInput callBack={this.callBack} placeholder="Email" value={this.state.email} />
                <Button onPress={() => this.updateProfileDetails()} style={{ backgroundColor: '#34D27C', marginTop:responsiveHeight(2),width: responsiveWidth(35),alignSelf:'center',color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Text style={{ color:'#fff' }}> Update</Text>
                </Button>
                </View>
            </View>
        )
    }
}
