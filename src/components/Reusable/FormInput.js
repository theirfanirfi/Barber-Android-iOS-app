import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default class FormInput extends Component {
    static = {
        placeholder: PropTypes.string,
        callBack: PropTypes.func,
        value: PropTypes.string,
        ispassword: PropTypes.bool,
    }
    state = {
        value: '',
    }

    render() {
        return (
            <TextInput secureTextEntry={this.props.ispassword === true ? true : false }
            style={{height: responsiveHeight(6.5), width:'94%',margin:4,padding:4,borderColor:'#000',borderWidth:1,borderRadius: 6,  }} 
            value={this.props.value !== null ? this.props.value : this.state.value} placeholder={this.props.placeholder} onChangeText={(text) => this.sendValueBackToParent(text)} />
        )
    }

    sendValueBackToParent = text => {
        this.setState({value: text});
        this.props.callBack(this.props.placeholder.trim().replace(/\s+/g, '').toLowerCase(),text);
    }

    cleanPlaceHolder = () => {
        return this.props.placeholder.trim().replace(/\s+/g, '').toLowerCase();
    }
}
