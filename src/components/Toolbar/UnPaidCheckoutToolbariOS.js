import React from 'react'
import PropTypes from 'prop-types'
import {ToolbarAndroid,StyleSheet, View,TouchableOpacity,Text} from 'react-native';
import { Icon } from 'react-native-elements'
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import Cart from '../../Lib/Cart';
import base64 from 'react-native-base64'
import XBar from 'react-native-x-bar'
import Button from 'apsl-react-native-button'
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
checkout(){
    if(this.state.isLoggedIn){
        //var toEncode = JSON.stringify(this.state.products);
        //console.log(base64.encode(toEncode));
  
        //this.props.navigation.navigate('Checkout');
        console.log(this.props.checkout_id);
        this.props.navigation.navigate('Web',{'checkout_id' : this.props.checkout_id});
      
    }else {
      alert('You are not loggedin to checkout.');
    }
}
goBack(){
    this.props.navigation.goBack();

}

  render () {

    return (
      <View>


<XBar
        
        slots={[
          { children : <Text style={{fontSize:20}}>{this.props.title}</Text> },
          {children: <Text></Text>},
          {children: <Text></Text>},
          { children : <Text></Text> },

          { children : 
          <TouchableOpacity style={{marginRight:8}}>
          <Button style={{borderWidth: -2,}} onPress={() => this.checkout()}>
            <Text>Checkout</Text> 
          </Button>
          </TouchableOpacity>
           },

           { children : 
            <TouchableOpacity style={{marginRight:8}}>
            <Button style={{borderWidth: -2,}} onPress={() => this.goBack()}>
              <Text>Back</Text> 
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
