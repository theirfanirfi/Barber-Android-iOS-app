import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {View,StyleSheet,Text,Platform, Image,TouchableOpacity,TextInput} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import Button from 'apsl-react-native-button';
import FormInput from '../../components/Reusable/FormInput';
import Base from '../../Lib/Base';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../Lib/Storage';

export default class LoginScreen extends Component {

    state = {
        email: 'i@i.com',
        password: 'irfan001',
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
    }
    }

    async componentDidMount(){
        // try{
        //     let u = await AsyncStorage.getItem('@user');
        //     let ju = JSON.parse(u);
        //     console.log(ju.token);
        // }catch(e){
        //     console.log(e);

        // }

        //Storage.logout();

    }

    makeLoginRequest(){
        fetch(Base.getBaseUrl()+'login?email='+this.state.email+'&password='+this.state.password).then(res => res.json()).then(response => {
          if(response.isError){
              alert(response.message);
          }else if(response.isLoggedIn){
            this.setState({'user': response.user},() => {
              this.storeData();
              //  alert(this.state.user.name);
              console.log('saved');
              this.props.navigation.navigate('Main');
            });



          }
        })
    }

    storeData = async () => {
        try {
          await AsyncStorage.setItem('@user', JSON.stringify(this.state.user));
          await AsyncStorage.setItem('@username', this.state.user.name);
          await AsyncStorage.setItem('@token', this.state.user.token);
        } catch (e) {
          // saving error
          console.log(e);
          alert('Error occurred in saving the loggedin user. Please try again.');
        }
      }

    login = () => {
        // if(this.state.isLoading == false){
        // console.log(this.state.email+" : "+this.state.password+ " isloading: "+this.state.isLoading);
        // this.setState({'isLoading': true});
        // }else {
        //     alert('Login is in process');
        // }

        this.makeLoginRequest();

    }
    gotoRegisterationScreen = () =>{
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{  color:'black',fontSize:24 }}>Login</Text>
                <FormInput placeholder="Email" callBack={this.callBack} />
                <FormInput ispassword={true} placeholder="Password" callBack={this.callBack} />
                <Button onPress={this.login} style={{ backgroundColor: '#34D27C', marginTop:responsiveHeight(2),width: responsiveWidth(35),alignSelf:'center',color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Icon name="lock" type="material" iconStyle={{ color:'#fff' }}/>
                    <Text style={{ color:'#fff' }}> Login</Text>
                </Button>
                <TouchableOpacity>
                <Text onPress={ this.gotoRegisterationScreen} style={{ color:'blue' }}>Don't have ID? click to Register</Text>
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