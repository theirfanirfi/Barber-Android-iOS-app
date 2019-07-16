import React, { Component } from 'react'
import {View,StyleSheet,Text,Platform, Image,FlatList,TouchableOpacity, BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon,SearchBar } from 'react-native-elements'
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import Cart from '../../Lib/Cart';
import base64 from 'react-native-base64'
import CartToolbar from '../Toolbar/CartToolbar';
import CartToolbarIOS from '../Toolbar/CartToolbarIOS';
export default class CartComponent extends Component {
    constructor(props){
        super(props);
        this.arrayHolder = [];

        this.myRef = React.createRef();
        this.backHandler;
    }

    state = {
        data: [],
        value: '',
        user:[],
        isLoggedIn: false,
        isUnFav: false,
        products:[],
        pids: []

    }


    async componentDidMount(){
        //this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
       await Storage.isLoggedIn(this);    
       //await Cart.emptyCart(this);
       await Storage.returnCart(this);  
    }

    handleBackPress = () => {
        console.log('back pressed');
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount(){
       // BackHandler.removeEventListener('hardwareBackPress',this.handleBackPress);
    }

    async removeFromCart(product_id) {
        console.log(product_id)
        await Cart.removeProductFromCart(this,product_id);
    }


    seachProducts = text => {
        //  alert(text);
        const searchedData = this.arrayHolder.filter((item) => {
            const pro = `${item.product_name.toUpperCase()}`;
            const textData = text.toUpperCase();
             return pro.indexOf(textData) > -1; 

        });
        this.setState({value: text});

        this.setState({data: searchedData},()=>{
            console.log(searchedData);
        });
      }

      renderEmptyCartMessage = () =>{
          if(this.state.products.length == 0){
              return (<View style={{ justifyContent:'center',alignContent:'center',alignItems:'center',height:'80%'  }}><Text style={{ fontSize:24, alignSelf:'center' }}>You cart is empty.</Text></View>)
          }else {
              return this.renderCart();
          }
      }

      renderCart(){
          return (
              <View>
                <FlatList
                data={this.state.products}
                extraData={this.state.isUnFav}
                renderItem={({ item,index }) => {
                    return (
                        <TouchableOpacity style={{ flex:1,flexDirection: 'column' }} onPress={() =>  this.props.navigation.navigate('ProductScreen', {'product_id' : item.product_id})}>
                    <View style={{ flex:1,flexDirection: 'column' }} >
                     <Image source={{  uri: item.product_image}} style={style.image}/>
                     <Text style={style.product_title}>{item.product_name}</Text>
                     <View style={{ flex:1,flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={style.pricing}>${item.product_price * item.quantity_ordered} </Text>
                 
                    <Icon 
                    name='delete-forever'
                    type='material'
                    iconStyle={{flex:1,alignSelf: 'flex-end',marginRight: 12, color: 'red', }}
                    size={responsiveWidth(6)}
                    onPress={() => this.removeFromCart(item.product_id)}
                    />

                    </View>
                    </View>
                    </TouchableOpacity>

                    )

                }}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return (
                    <SearchBar
                    placeholder="Search..."
                    lightTheme
                    onChangeText={text => this.seachProducts(text)}
                    autoCorrect={false}
                    value={this.state.value}
                    />
                    )
                }}
                style={{ marginBottom:responsiveHeight(10), }}
                />
              </View>
          )
      }



    render() {
        const toolbar = Platform.OS === 'android' ? <CartToolbar title='Cart' navigation={this.props.navigation} /> : <CartToolbarIOS title='Cart' navigation={this.props.navigation} />;
        return (
            <View>
                {toolbar}
             {this.renderEmptyCartMessage()}
             </View>
        )


    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flex:1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    image: {
        width: '95%',
        height: responsiveHeight(35),
        margin: 2,
    },
    pricing: {
        fontSize: responsiveFontSize(1.5),
        color: '#000',
        marginLeft: 4,
        //font: 'bold',
    },

    product_title: {
        fontSize: responsiveFontSize(2),
        color: '#000',
        marginLeft: 4,
        //font: 'bold',
    }

  });
