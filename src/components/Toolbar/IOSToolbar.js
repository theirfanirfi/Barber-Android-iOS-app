import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import XBar from 'react-native-x-bar'
import Button from 'apsl-react-native-button'
import Storage from '../../Lib/Storage';
import PropTypes from 'prop-types'


export default class IOSToolbar extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  logout() {
    Storage.logout(this);
  }
  render() {
    return (
        <View >
        <XBar
        
  slots={[
    { children : <Text style={{fontSize:20}}>{this.props.title}</Text> },
    { children : <Text></Text> },
    { children : 
    <TouchableOpacity style={{marginRight:8}}>
    <Button style={{borderWidth: -2,}} onPress={() => this.logout()}>
      <Text>Logout</Text> 
    </Button>
    </TouchableOpacity>
     }
  ]}
  style={style.toolbar}
  layout='space between'

/>
        </View>
    );
  }
}

const style = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fff',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop:56,
  },
});
