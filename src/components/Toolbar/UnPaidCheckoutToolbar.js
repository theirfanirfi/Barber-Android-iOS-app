import React from 'react'
import PropTypes from 'prop-types'
import {ToolbarAndroid,StyleSheet, View} from 'react-native';
import { Icon } from 'react-native-elements'
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import Cart from '../../Lib/Cart';
import base64 from 'react-native-base64'
export default class UnPaidCheckoutToolbar extends React.Component{
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
  checkout_id: 0,
}

async componentDidMount(){
  await Storage.isLoggedIn(this);
  // let ck_id = this.props.navigation.getParam('ck_id');
  // this.setState({'checkout_id': ck_id});
}


  render () {

    return (
      <View>
        <ToolbarAndroid
       // logo={require('./app_logo.png')}
        title={this.props.title}
        actions={[{title: 'Checkout', show: 'always'},
      {title: 'Back', show:'always'}]}
        style={style.toolbar}
        onActionSelected={this.onActionSelected}
        />

      </View>

    )
  }


  onActionSelected = position => {
  if (position === 0) { // index of 'Checkout'
  if(this.state.isLoggedIn){
      //var toEncode = JSON.stringify(this.state.products);
      //console.log(base64.encode(toEncode));

      //this.props.navigation.navigate('Checkout');
      console.log(this.props.checkout_id);
      this.props.navigation.navigate('Web',{'checkout_id' : this.props.checkout_id});
    
  }else {
    alert('You are not loggedin to checkout.');
  }
  }else if(position == 1){
    this.props.navigation.goBack();
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
