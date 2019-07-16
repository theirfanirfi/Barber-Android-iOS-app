import React, { Component } from 'react'
import {View,Text, Dimensions,Platform} from 'react-native';
import { WebView }from 'react-native-webview';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import Base from '../Lib/Base';
import Storage from '../Lib/Storage';
import base64 from 'react-native-base64'
import WebToolbar from './Toolbar/WebToolbar';
import WebToolbariOS from './Toolbar/WebToolbariOS';

export default class WebViewComponent extends Component {
    constructor(props){
        super(props);
        this.weburl = '';
        this.WebRef = 'webview';
    }
    static = {
        ck_id: PropTypes.string
    }

    static navigationOptions = {
        header:null,
    }

    state = {
        height: 0,
        indeterminate: false,
        animated: false,
        checkout_id: '',
        user: [],
        isLoggedIn: false,
        key: 0,
    }

    toolbarCallBack = (which) =>{
        console.log(which);
        if(which === 'reload'){
            this.setState({'key': this.state.key + 1});
        }else if(which === 'done'){
            this.props.navigation.goBack(null);
        }
    }

    loadStarted = () => {
        this.setState({height: 20, indeterminate: true, animated: true});
        console.log('Load started');
    }
    loadEnded = () => {
        this.setState({height: 0, indeterminate: false, animated: false});
      
        console.log('Load ended');
    }
    onLoad(){
        console.log('Load');

    }
    async componentDidMount(){
        this.state.checkout_id = this.props.navigation.getParam('checkout_id');
         await Storage.isLoggedIn(this);

         let encodedToken = base64.encode(this.state.user.token);
         this.weburl = Base.getBaseUrl()+'user/paycart/'+encodedToken+'/'+this.state.checkout_id+'?token='+this.state.user.token
       //  this.weburl = 'https://www.google.com';
         console.log(this.weburl);
    }
    render() {
        const toolbar = Platform.OS === 'android' ? <WebToolbar title="Pay" resCallBack={this.toolbarCallBack} />  : <WebToolbariOS title="Pay" resCallBack={this.toolbarCallBack} />;           
                
        return (
            <View style={{ flex:1,justifyContent:'center',alignContent:'center',width:'100%',height:'100%' }}>
                <Progress.Bar height={this.state.height} indeterminate={this.state.indeterminate} animated={this.state.animated} style={{  width:'100%', }} />
                <View style={{ width:'100%',height:'100%' }}>
                    {toolbar}
                <WebView 
               originWhitelist={['*']}
                key={this.state.key}
                source={{ uri: this.weburl }}  style={{ width:'100%',height:'100%' }} onLoad={this.onLoad} onLoadStart={this.loadStarted} onLoadEnd={this.loadEnded} >
                </WebView>
                </View>
            </View>
        )
    }
}
