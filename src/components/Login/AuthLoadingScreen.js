import React, { Component } from 'react'
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }

        // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('@user');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };
    render() {
        return (
            <View style={{ flex:1,justifyContent:'center',alignContent:'center' }}>
            <ActivityIndicator />
            {/* <StatusBar barStyle="default" /> */}
            <Text style={{ alignSelf:'center' }}>Please wait...</Text>
          </View>
        )
    }
}
