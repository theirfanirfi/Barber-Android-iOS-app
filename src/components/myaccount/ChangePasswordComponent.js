import React, { Component } from 'react'
import {View,StyleSheet,Text,FlatList,Platform,TouchableOpacity,TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FormInput from '../Reusable/FormInput';
import MainToolbar from '../Toolbar/MainToolbar';
import Button from 'apsl-react-native-button';
import Storage from '../../Lib/Storage';
import Base from '../../Lib/Base';
export default class ChangePasswordComponent extends Component {
    state = {
        currentpassword: '',
        newpassword: '',
        user:[],
        isLoggedIn: false,
    }

    static navigationOptions = {
        headerTitle: 'Change Password',
    }
    
    callBack = (which,text) => {
        if(which === 'currentpassword'){
            this.setState({'currentpassword':text});

        }else if(which === 'newpassword'){
            this.setState({'newpassword':text});
        }
    }

    async componentDidMount(){
        await Storage.isLoggedIn(this);
    }

    async changePassword(){
        if(this.state.isLoggedIn){
            console.log(this.state.currentpassword+ " : "+this.state.newpassword);
            return fetch(Base.getBaseUrl()+'user/changepass?token='+this.state.user.token+'&cp='+this.state.currentpassword+'&np='+this.state.newpassword)
            .then(res => res.json())
            .then(response => {
                if(response.isError){
                    alert(response.message);
                }else if(response.isChanged){
                    alert(response.message);
                }
            });
        }else {
            alert('You are not loggedIn to perform this action.');
        }
    }

    render() {
        const osBasedToolbar = Platform.OS === 'android' ? <MainToolbar title="Change Password" /> : <MainToolbar title="Change Password"/>;

        return (
            <View>
                <View style={{ justifyContent:'center', alignContent:'center' }}>
                <FormInput ispassword={true} callBack={this.callBack} placeholder="Current Password" />
                <FormInput ispassword={true} callBack={this.callBack} placeholder="New Password" />
                <Button onPress={() => this.changePassword()} style={{ backgroundColor: '#34D27C', marginTop:responsiveHeight(2),width: responsiveWidth(35),alignSelf:'center',color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Text style={{ color:'#fff' }}> Change Password</Text>
                </Button>
                </View>
            </View>
        )
    }
}
