import React from 'react'
//import PropTypes from 'prop-types'
import {Platform, StyleSheet, Text, View} from 'react-native';
import MainToolbar from '../Toolbar/MainToolbar';
//import style from '../../styles/appstyles.module.css'
import ProductsComponent from '../products/ProductsComponent';
import Product from '../product/Product';
import CategoriesComponent from '../categories/CategoriesComponent';
import ProductsByCatComponent from '../ProductsByCat/ProductsByCatComponent';
import SettingsComponent from '../myaccount/SettingsComponent';
import LoginDetailsComponent from '../Login/LoginDetailsComponent';
import ChangePasswordComponent from '../myaccount/ChangePasswordComponent';
import LoginScreen from '../Login/LoginScreen';
import BottomNav from '../../components/MainComponent/BottomNav';
import WishList from '../../components/wishlist/WishList';
import CheckoutComponent from '../../components/Checkout/CheckoutComponent';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import CartComponent from '../Cart/CartComponent';
import WebViewComponent from '../WebViewComponent';
import Storage from '../../Lib/Storage';
import Cart from '../../Lib/Cart';
import GalleryComponent from '../Gallery/GalleryComponent';
import MakeBookingComponent from '../Booking/MakeBookingComponent';
import MyBookingComponent from '../Booking/MyBookingComponent';
import ChatComponent from '../Chat/ChatComponent';
import ProfileImageComponent from '../myaccount/ProfileImageComponent';

export default class MainComponent extends React.Component{
  constructor(props){
    super(props);
    const {navigate} = this.props.navigation;
   this.renderHomeScreen();
  }

  async renderHomeScreen() {
    try {
      await Storage.isLoggedIn(this);
    } catch (error) {
      console.log(error);
    }
  }
  //component
  static navigationOptions = {
    header: null,
  }

  state = {
    activeTab: 'products',
    user: [],
    isLoggedIn: false,
  }
  callBack = tab => {
    this.setState({activeTab: tab});
    console.log(tab);
  }

  navigationCallBackForProduct(product_id){
    console.log(product_id);
    //this.props.navigation.navigate('Product');

  }

   componentDidMount(){
    //console.log(this.props.navigation)
        // await Cart.emptyCart(this);
        //Storage.logout();

  }

  // renderComponent = () => {
  //   if(this.state.activeTab === 'products'){
  //     return (
  //       <View>
  //       <ProductsComponent/>
  //       </View>
  //     )
  //  }
  //}

  render () {

        const osBasedToolbar = Platform.OS === 'android' ? <MainToolbar /> : <MainToolbar/>;
        let loadComponent = <ProfileImageComponent navigation={this.props.navigation} />;
        if(this.state.activeTab === 'gallery'){
           //loadComponent = <GalleryComponent navigation={this.props.navigation} />;
          loadComponent = <ProfileImageComponent navigation={this.props.navigation} />;
        }else if(this.state.activeTab === 'makebooking'){
          loadComponent = <MakeBookingComponent navigation={this.props.navigation} />;
        }else if(this.state.activeTab === 'chat'){
          loadComponent = <ChatComponent navigation={this.props.navigation}/>;
        }else if(this.state.activeTab === 'mybookings'){
          loadComponent = <MyBookingComponent navigation={this.props.navigation} />
        }else if(this.state.activeTab === 'account'){
          loadComponent = <SettingsComponent navigation={this.props.navigation} />
        }

    return (
      <View style={{ height:'100%' }}>

        {loadComponent}
       <BottomNav callBack={this.callBack} />              
      </View>
    )
  }
}

const style = StyleSheet.create({

  container: {
  
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue'
  }
  
  });
