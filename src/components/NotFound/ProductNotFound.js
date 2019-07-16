import React, { Component } from 'react'
import {Text, View} from 'react-native'
export default class ProductNotFound extends Component {
    render() {
        return (
            <View>
            <Text style={{ flex:1,justifyContent:'center', fontSize: 24,color:'red' }}>No Product provided to display</Text>
            </View>
        )
    }
}
