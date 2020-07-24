import React, { Component } from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
const logo = require('./../../images/logo.png');
export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('@user');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(user ? 'App' : 'Auth');
    // this.props.navigation.navigate('App');
  };
  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#E4DAF0' }}>
        <Image source={logo} style={{ width: '72%', alignSelf: 'center' }} />
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'gray', alignSelf: 'center', position: 'absolute', bottom: 30 }}>Powered by TechGiantz</Text>
      </View>
    )
  }
}
