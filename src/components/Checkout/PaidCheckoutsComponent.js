import React, { Component } from 'react'
import {View,Text, FlatList,TouchableOpacity} from 'react-native';
import Storage from '../../Lib/Storage';
import Base from '../../Lib/Base';
export default class PaidCheckoutsComponent extends Component {
    state = {
        user: [],
        isLoggedIn: false,
        checkouts: [],
    }

    static navigationOptions = {
        headerTitle: 'Paid checkouts'
    }

    async componentDidMount(){
        await Storage.isLoggedIn(this);
        let BASE_URL = Base.getBaseUrl();

        return fetch(BASE_URL+'user/paid?token='+this.state.user.token).then((response) => response.json()).then((res) => {
            if(res.isError){
                alert(res.message);
            }else if(res.isFound){
                this.setState({'checkouts': res.cks},() => {
                    console.log(this.state.checkouts);
                });
            }else {
                alert(res.message);
            }
        });
    }

    gotoCheckout = (checkout_id) => {
        //console.log(checkout_id);
        this.props.navigation.navigate('PaidCKProducts', {ck_id: checkout_id});
    }
    renderItem = ({item,index}) => {
        console.log(item.name);
        return (
            <TouchableOpacity style={{ padding:12 }} onPress={() => this.gotoCheckout(item.id)}>
                <Text style={{ color: '#000', fontSize: 20 }}>Products: {item.products_quantity}  |  Price: ${item.total_price}</Text>
            </TouchableOpacity>
        )
    }

    renderSeparator = ({item,index}) => {
        return (
        <View style={{ backgroundColor: '#000',height: 0.8}}>
        </View>
        )
    }

    render() {
        return (
             <View>
            <FlatList
            data={this.state.checkouts}
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            />
            </View>
        )
    }
}
