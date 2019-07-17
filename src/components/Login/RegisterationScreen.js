import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {View,StyleSheet,Text,Platform, Image,TouchableOpacity,TextInput} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button';
import FormInput from '../Reusable/FormInput';
import Base from '../../Lib/Base';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../Lib/Storage';

export default class RegisterationScreen extends Component {

    state = {
        fullname: '',
        email: '',
        password: '',
        confirmpassword: '',
        isLoading: false,
        user: []
    }

    static navigationOptions = {
        header: null
      }

    callBack = (which,text) => {
        if(which === 'email'){
        this.setState({'email':text});
    }else if(which === 'password'){
        this.setState({'password':text});
    }else if(which === 'confirmpassword'){
      this.setState({'confirmpassword':text});
    }else if(which === 'fullname'){
      this.setState({'fullname':text});
    }
    }

    async componentDidMount(){
    }

    makeRegisterationRequest(){
        fetch(Base.getBaseUrl()+'register?email='+this.state.email+'&password='+this.state.password+'&cpass='+this.state.confirmpassword+'&name='+this.state.fullname).then(res => res.json()).then(response => {
          if(response.isError){
              alert(response.message);
          }else if(response.isRegistered){
            this.setState({'user': response.user},() => {
              this.storeData();
              //  alert(this.state.user.name);
              console.log('saved');

            });



          }
        })
    }

    storeData = async () => {
        try {
          await AsyncStorage.setItem('@user', JSON.stringify(this.state.user));
          await AsyncStorage.setItem('@username', this.state.user.name);
          await AsyncStorage.setItem('@token', this.state.user.token);
          this.props.navigation.navigate('Main');
        } catch (e) {
          console.log(e);
          alert('Error occurred in saving the loggedin user. Please try again.');
        }
      }

    register = () => {
        this.makeRegisterationRequest();
    }
    gotoLoginScreen = () => {
      this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{  color:'black',fontSize:24 }}>Register</Text>
                <FormInput placeholder="Full Name" callBack={this.callBack} />
                <FormInput placeholder="Email" callBack={this.callBack} />
                <FormInput ispassword={true} placeholder="Password" callBack={this.callBack} />
                <FormInput ispassword={true} placeholder="Confirm Password" callBack={this.callBack} />
               
                <Button onPress={this.register} style={{ backgroundColor: '#34D27C', marginTop:responsiveHeight(2),width: responsiveWidth(35),alignSelf:'center',color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Icon name="lock" type="material" iconStyle={{ color:'#fff' }}/>
                    <Text style={{ color:'#fff' }}> Register</Text>
                </Button>
                <TouchableOpacity>
                <Text onPress={ this.gotoLoginScreen} style={{ color:'blue' }}>Have ID? click to Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

container: {
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
    color:'black'
}

});