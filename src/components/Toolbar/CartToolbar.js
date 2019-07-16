import React from 'react'
import PropTypes from 'prop-types'
import {ToolbarAndroid,StyleSheet, View} from 'react-native';
import { Icon } from 'react-native-elements'
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import Cart from '../../Lib/Cart';
import base64 from 'react-native-base64'
export default class CartToolbar extends React.Component{
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


  render () {

    return (
      <View>
        <ToolbarAndroid
       // logo={require('./app_logo.png')}
        title={this.props.title}
        actions={[{title: 'Checkout', show: 'always'}]}
        style={style.toolbar}
        onActionSelected={this.onActionSelected}
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
    backgroundColor: '#f9f9f9',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
