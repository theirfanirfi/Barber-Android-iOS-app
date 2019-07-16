import React, { Component } from 'react'
import {View,StyleSheet,Text,Platform, Image,FlatList,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon,SearchBar } from 'react-native-elements'
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
export default class WishList extends Component {
    constructor(props){
        super(props);
        this.arrayHolder = [];
        this.myRef = React.createRef();

    }

    state = {
        data: [],
        value: '',
        user: [],
        isLoggedIn: false,
    }


    async componentDidMount(){
        await Storage.isLoggedIn(this);
       let BASE_URL = Base.getBaseUrl();
       if(this.state.isLoggedIn){
       return fetch(BASE_URL+'user/wishlist?token='+this.state.user.token).then((response) => response.json()).then((res) => {
           this.setState({'data': res.products});
           //console.log(res.products);
           this.arrayHolder = res.products;
       });
    }else {
        alert('You are not logged in to perform this action.');
    }
    }

 

    async addToWhishList(product) {
        let BASE_URL = Base.getBaseUrl();
        if(this.state.isLoggedIn){
        return fetch(BASE_URL+'user/addtowishlist?token='+this.state.user.token+'&pid='+product).then((response) => response.json()).then((res) => {
            if(res.isError){
                alert(res.message);
            }else if(res.isAdded){
                alert(res.message);
                this.setState({
                    data: res.products
                });
            }else if(res.isDeleted){
              alert(res.message);
              this.setState({
                data: res.products
            });
            }
        });
     }else {
         alert('You are not logged in to perform this action.');
     }
    }

    returnHeight(){
        if(Platform.OS === 'ios'){
            return responsiveHeight(5);
        }else {
            return responsiveHeight(1);
        }
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

      renderIconMode = (isFav) => {
        //   if(this.state.i)
        if(this.state.isLoggedIn && isFav === 'true'){
         console.log('else item is : '+isFav);
            return true;
        }else {
         console.log('else item is : '+isFav);
            return false;
        }
 
 
       }

       renderWishList(){
           return (
               <View>
                   
                <FlatList
                data={this.state.data}
                renderItem={({ item,index }) => {
                    return (
                        <TouchableOpacity style={{ flex:1,flexDirection: 'column' }} onPress={() =>  this.props.navigation.navigate('ProductScreen', {'product_id' : item.product_id})}>
                    <View style={{ flex:1,flexDirection: 'column' }} >
                     <Image source={{  uri: item.product_image}} style={style.image}/>
                     <Text style={style.product_title}>{item.product_name}</Text>
                     <View style={{ flex:1,flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={style.pricing}>${item.product_price} </Text>
                    
                    <Icon 
                   name='favorite'
                    type='material'
                    iconStyle={{flex:1,alignSelf: 'flex-end',marginRight: 12,color: 'red', }}
                    size={responsiveWidth(6)}
                    onPress={() => this.addToWhishList(item.product_id)}
                    ref={this.myRef}
                    />

                    </View>
                 {this.returnDescription(item.product_desc)}
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
                style={{ marginBottom:responsiveHeight(10), marginTop: this.returnHeight() }}
                />
               </View>
           )
       }

       renderEmptyWishListMessage(){
           if(this.state.data == null){
            return (<View style={{ justifyContent:'center',alignContent:'center',alignItems:'center',height:'100%'  }}><Text style={{ fontSize:24, alignSelf:'center' }}>You WishList is empty.</Text></View>)
        
           }else {
               return this.renderWishList();
           }
    }
    returnDescription(desc){
        if( desc == null){
            console.log("description is null")
        }else {
            if(desc.length < 100){
            return (
<Text style={{ margin:4 }}>{desc}</Text>
              
            )
        }else if(desc.length > 100){
            return (
              <Text style={{ margin:4, textAlign:'justify'}}>{desc.substr(0,100)+'...'}</Text>
            )
        }
      }
    }

    render() {

        return (
            <View>
                {this.renderEmptyWishListMessage()}
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
