import React, { Component } from 'react'
import {View,StyleSheet,Text,Platform, Image,FlatList,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon,SearchBar } from 'react-native-elements'
import BottomNavigation, {
    FullTab
  } from 'react-native-material-bottom-navigation'
export default class BottomNav extends Component {
    static = {
        callBack: PropTypes.func.isRequired
    }
    state = {
        tabSelected: 'games'
    }
    returnTabBack(tab){
        this.props.callBack(tab);
    }
    tabs = [
        {
          key: 'products',
          icon: 'home',
          label: 'Products',
          barColor: '#388E3C',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'categories',
          icon: 'line-weight',
          label: 'Categories',
          barColor: '#B71C1C',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'account',
          icon: 'perm-identity',
          label: 'My Account',
          barColor: '#E64A19',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'cart',
            icon: 'shopping-cart',
            label: 'My Cart',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
          }

          ,
          {
            key: 'wishlist',
            icon: 'favorite-border',
            label: 'WishList',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
          }
      ]
     
      renderIcon = icon => ({ isActive }) => (
        <Icon size={24} type="material" color="white" name={icon} />
      )
     
      renderTab = ({ tab, isActive }) => (
        <FullTab
          isActive={isActive}
          key={tab.key}
          label={tab.label}
          renderIcon={this.renderIcon(tab.icon)}
        />
      )

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.bottomView}>
                <BottomNavigation 
          onTabPress={newTab => {this.setState({ activeTab: newTab.key });
          this.returnTabBack(newTab.key)}
        }
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
                </View>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer:
    {
        flex: 1,
       // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

    bottomView:{

      width: '100%', 
      position: 'absolute',
      bottom: 0
    },
});
