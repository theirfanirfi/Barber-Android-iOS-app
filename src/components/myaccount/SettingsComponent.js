import React, { Component } from 'react'
import {View,StyleSheet,Text,FlatList,Platform,TouchableOpacity} from 'react-native';
import MainToolbar from '../Toolbar/MainToolbar';
import IOSToolbar from '../Toolbar/IOSToolbar';
import { Icon } from 'react-native-elements'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default class SettingsComponent extends Component {
    settings = [
        {
            'key': 'Login Details',
        },
        {
            'key': 'Change Password',
        },
        {
            'key': 'Paid checkouts',
        },
        {
            'key': 'Unpaid checkouts',
        },
    ]

    render() {
        const osBasedToolbar = Platform.OS === 'android' ? <MainToolbar title="My account" navigation={this.props.navigation} /> : <IOSToolbar title="My account" navigation={this.props.navigation}/>;
        return (
            <View>
             {osBasedToolbar}
            <FlatList
            data={this.settings}
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            />
            </View>
        )
    }

    gotoPages(which){
        if(which === 'Login Details'){
            this.props.navigation.push('LoginDetails');
        }else if(which === 'Change Password'){
            this.props.navigation.push('ChangePass');

        }else if(which === 'Paid checkouts'){
            this.props.navigation.push('PaidCK');
        }
        else if(which === 'Unpaid checkouts'){
            this.props.navigation.push('UnPaidCK');

        }
    }

    renderItem = ({item,index}) => {
        return (
            <TouchableOpacity onPress={() => {this.gotoPages(item.key)}}>

            <View style={{ flex:1,flexDirection:'row',alignContent:'flex-start',margin:12 }}>
            {this.renderIcon(item)}

                <Text style={{ alignSelf:'flex-start',fontSize:responsiveFontSize(2.2),color:'#000',marginLeft: responsiveWidth(2) }}>{item.key}</Text>
            </View>
            </TouchableOpacity>

        )
    }

    renderSeparator = ({item,index}) => {
        return (
        <View style={{ backgroundColor: '#000',height: 0.8}}>
        </View>
        )
    }

    renderIcon = item => {
        if(item.key === 'Login Details'){
            return (
                <View>
                <Icon
                name='account-box'
                type='material'/>
                </View>

            )
        }else if(item.key === 'Change Password'){
            return (
                <View>
                <Icon
                name='lock'
                type='material'/>
                </View>
            )
        }else if(item.key === 'Paid checkouts'){
            return (
                <View>
                <Icon
                name='shopping-basket'
                type='material'/>
                </View>
            )
        }
        else if(item.key === 'Unpaid checkouts'){
            return (
                <View>
                <Icon
                name='shopping-cart'
                type='material'/>
                </View>
            )
        }
    }
}
