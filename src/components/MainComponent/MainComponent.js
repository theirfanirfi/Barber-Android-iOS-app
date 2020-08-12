import React from 'react'
//import PropTypes from 'prop-types'
import { Platform, StyleSheet, Text, View } from 'react-native';
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

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Base from '../../Lib/Base';
import BackgroundTimer from 'react-native-background-timer';
import BackgroundService from 'react-native-background-actions';




const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask desc',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
};

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this.renderHomeScreen();
  }

  veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise((resolve) => {
      BackgroundTimer.runBackgroundTimer(() => {
        //code that will be called every 10 seconds 
        this.showNotification();
        this.showConfirmBookingNotification();

      },
        10000);
    });
  };

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
    this.setState({ activeTab: tab });
    console.log(tab);
  }

  navigationCallBackForProduct(product_id) {
    console.log(product_id);
    //this.props.navigation.navigate('Product');

  }

  showNotification() {
    console.log('chat called')

    var url = Base.getBaseUrl() + "user/chatnotification?token=" + this.state.user.token;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.showChatNotification) {
          PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "You have new chat messages.", // (required)
            group: "group",
            priority: "low",
            date: new Date(Date.now() + 30 * 1000), // in 60 secs
          });
        }
      })
      .finally(() => {
        // setTimeout(this.showNotification(), 3000)
      })
  }

  showConfirmBookingNotification() {
    console.log('apt called')
    var url = Base.getBaseUrl() + "user/aptconfirmation?token=" + this.state.user.token;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.showaptnotification) {
          PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "Your booking is confirmed.", // (required)
            group: "group",
            date: new Date(Date.now() + 30 * 1000), // in 60 secs
          });
        }
      })
      .finally(() => {
        // setTimeout(this.showNotification(), 3000)
      })
  }

  async componentDidMount() {
    await BackgroundService.start(this.veryIntensiveTask, options);
    // this.timer = setInterval(() => {
    //   this.showNotification();
    //   this.showConfirmBookingNotification();
    // }, 10000);


    // BackgroundTimer.runBackgroundTimer(() => {
    //   //code that will be called every 10 seconds 
    //   this.showNotification();
    //   this.showConfirmBookingNotification();
    // },
    //   10000);
    //rest of code will be performing for iOS on background too

    //BackgroundTimer.stopBackgroundTimer();
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





  render() {

    const osBasedToolbar = Platform.OS === 'android' ? <MainToolbar /> : <MainToolbar />;
    let loadComponent = <GalleryComponent navigation={this.props.navigation} />;
    if (this.state.activeTab === 'gallery') {
      loadComponent = <GalleryComponent navigation={this.props.navigation} />;
    } else if (this.state.activeTab === 'makebooking') {
      loadComponent = <MakeBookingComponent navigation={this.props.navigation} />;
    } else if (this.state.activeTab === 'chat') {
      loadComponent = <ChatComponent navigation={this.props.navigation} />;
    } else if (this.state.activeTab === 'mybookings') {
      loadComponent = <MyBookingComponent navigation={this.props.navigation} />
    } else if (this.state.activeTab === 'account') {
      loadComponent = <SettingsComponent navigation={this.props.navigation} />
    }

    return (
      <View style={{ height: '100%' }}>

        {loadComponent}
        <BottomNav callBack={this.callBack} />
      </View>
    )
  }
}

const style = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  }

});
