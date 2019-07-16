import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FormInput from '../Reusable/FormInput';
import PropTypes from 'prop-types'
import Button from 'apsl-react-native-button'
import NumericInput from 'react-native-numeric-input'
import Cart from '../../Lib/Cart';
import Storage from '../../Lib/Storage';
import Base from '../../Lib/Base';
import base64 from 'react-native-base64'
export default class CheckoutComponent extends Component {
    state = {
        fullname: '1234',
        company: '1234',
        address: '1234',
        town: '1234',
        postalcode: '1234',
        email: '1234',
        phone: '1234',
        isLoggedIn: false,
        user: [],
        products: []
    }

    static navigationOptions = {
        title: 'Checkout'
      }

    callBackRes = (which,text) => {
        if(which === 'fullname'){
            this.setState({'fullname': text});
        }else if(which === 'company'){
            this.setState({'company': text});
        }else if(which === 'address'){
            this.setState({'address': text});
        }else if(which === 'citytown'){
            this.setState({'town': text});
        }else if(which === 'postalcode'){
            this.setState({'postalcode': text});
        }else if(which === 'email'){
            this.setState({'email': text});
        }else if(which === 'phone'){
            this.setState({'phone': text});
        }
    }
    async componentDidMount(){
        await Storage.isLoggedIn(this);    
        //await Cart.emptyCart(this);
        await Storage.returnCart(this); 
        //console.log(base64.encode((JSON.stringify(this.state.products)))); 
    }

    placeOrder(){
        if(this.state.fullname.length == 0 || this.state.company.length == 0 || this.state.address.length == 0 || this.state.town.length == 0 || this.state.postalcode.length == 0 ||
            this.state.email.length == 0 || this.state.phone.length == 0){
                alert('None of the fields can be emtpy.');
            }
            else if(this.state.products.length == 0){
                alert('Your cart is empty.');
            }
            else {
                this.makeRequest();
            }
    }

    makeRequest(){
        var data = new FormData();
        var encodedCart = base64.encode((JSON.stringify(this.state.products)));        
        data.append('token',this.state.user.token);
        data.append('ct', encodedCart);
        data.append('name',this.state.fullname);
        data.append('company',this.state.company);
        data.append('address',this.state.address);
        data.append('town',this.state.town);
        data.append('postalcode',this.state.postalcode);
        data.append('email',this.state.email);
        data.append('phone',this.state.phone);


        fetch(Base.getBaseUrl()+'user/cart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body:data,
                }).then(res => res.json())
                .then(response => {
                   // console.log(JSON.stringify(response))
                   if(response.isError){
                       alert(response.message);
                   }else if(response.isCartSaved){
                       var checkout_id = response.ck.id;
                       Cart.emptyCart(this);
                       this.props.navigation.navigate('Web',{'checkout_id' : checkout_id});
                   }else {
                       alert(response.message);
                   }
                });
    }

    render() {
        return (
            <View style={{ flex:1,justifyContent:'center',alignContent:'center',alignItems: 'center',padding:12,height:'100%' }}>
                <View style={{ flex:1,width:'100%',height:'100%' }}>
                <Text style={{ color: '#000',fontSize:24,alignSelf:'flex-start', }}>Checkout</Text>
                <Text style={{ color: '#000',alignSelf:'flex-start', }}>Please enter all the details carefully.</Text>
                <FormInput placeholder="Full name" ispassword={false} value={this.state.fullname} callBack={this.callBackRes} />
                <FormInput placeholder="Company" ispassword={false} value={this.state.company} callBack={this.callBackRes} />
                <FormInput placeholder="Address" ispassword={false} value={this.state.address} callBack={this.callBackRes} />
                <FormInput placeholder="City Town" ispassword={false} value={this.state.town} callBack={this.callBackRes} />
                <FormInput placeholder="Postal Code" ispassword={false} value={this.state.postalcode} callBack={this.callBackRes} />
                <FormInput placeholder="Email" ispassword={false} value={this.state.email} callBack={this.callBackRes} />
                <FormInput placeholder="Phone" ispassword={false} value={this.state.phone} callBack={this.callBackRes} />
                <Button onPress={() => this.placeOrder()} style={{ backgroundColor: '#34D27C', marginTop:responsiveHeight(2),width: responsiveWidth(35),alignSelf:'center',color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Icon name="shopping-cart" type="material" iconStyle={{ color:'#fff' }}/>
                    <Text style={{ color:'#fff' }}> Place Order</Text>
                </Button>

                </View>
          </View>
        )
    }
}
