import React from 'react'
import PropTypes from 'prop-types'
import {ToolbarAndroid,StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import Cart from '../../Lib/Cart';
import base64 from 'react-native-base64'
import XBar from 'react-native-x-bar'
import Button from 'apsl-react-native-button'


export default class CartToolbarIOS extends React.Component{
  static propTypes = {
    title: PropTypes.string,
  }



  constructor(props){
    super(props);
}

state = {
  products: [],
  isLoggedIn: false,
  user: [],
}

async componentDidMount(){
  await Storage.isLoggedIn(this);
  await Storage.returnCart(this);

}
checkout(){
    if(this.state.isLoggedIn){
        if(this.state.products.length == 0){
        alert('Your cart is empty');
        }else {
          var toEncode = JSON.stringify(this.state.products);
          console.log(base64.encode(toEncode));
    
          this.props.navigation.navigate('Checkout');
        }
      }else {
        alert('You are not loggedin to checkout.');
      }
}

  render () {

    return (
      <View>
       <XBar
        
        slots={[
          { children : <Text style={{fontSize:20}}>{this.props.title}</Text> },
          { children : <Text></Text> },
          { children : 
          <TouchableOpacity style={{marginRight:8}}>
          <Button style={{borderWidth: -2,}} onPress={() => this.checkout()}>
            <Text>Checkout</Text> 
          </Button>
          </TouchableOpacity>
           }
        ]}
        style={style.toolbar}
        layout='space between'
      
      />

      </View>

    )
  }


  onActionSelected = position => {
  if (position === 0) { // index of 'Checkout'
  if(this.state.isLoggedIn){
    if(this.state.products.length == 0){
    alert('Your cart is empty');
    }else {
      var toEncode = JSON.stringify(this.state.products);
      console.log(base64.encode(toEncode));

      this.props.navigation.navigate('Checkout');
    }
  }else {
    alert('You are not loggedin to checkout.');
  }
  }
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
