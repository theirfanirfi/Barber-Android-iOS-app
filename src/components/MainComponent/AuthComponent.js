import React, { Component } from 'react'
import {View} from 'react-native';
import Storage from '../../Lib/Storage';
import MainComponent from './MainComponent';
import LoginScreen from '../Login/LoginScreen';
export default class AuthComponent extends Component {
    state = {
        user:[],
        isLoggedIn: false,
    }


    async renderComp(){
        await Storage.isLoggedIn(this);
        let ifLoggedIn = this.state.isLoggedIn ? <MainComponent navigation={this.props.navigation} /> : <LoginScreen navigation={this.props.navigation} />;
        if(this.state.isLoggedIn){
            return (
                <View>
                    <MainComponent navigation={this.props.navigation} /> 
                </View>
            )
        }else {
            return (
                <View>
                    <LoginScreen navigation={this.props.navigation} />
                </View>
            )
        }

    }
    render() {
        return (
            <View>
               {this.renderComp()}
            </View>
        )
    }
}
