import React, { Component } from 'react'
import {View,StyleSheet,Text,Platform, Image,FlatList,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon,SearchBar } from 'react-native-elements'
import Base from '../../Lib/Base';
export default class ProductsByCatComponent extends Component {
    constructor(props){
        super(props);
        this.arrayHolder = [];
    }

    state = {
        data: [],
        value: '',
    }


    async componentDidMount(){
       let BASE_URL = Base.getBaseUrl();
       let cat_id = this.props.navigation.getParam('cat_id');
       return fetch(BASE_URL+'getcatproducts/'+cat_id).then((response) => response.json()).then((res) => {
           this.setState({data: res.products});
          // console.log(res);
           this.arrayHolder = res.products;
       });
    }

    addToWhishList = product => {
        console.log("Product id: "+product);
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
                    name='favorite-border'
                    type='material'
                    iconStyle={{flex:1,alignSelf: 'flex-end',marginRight: 12 }}
                    size={responsiveWidth(6)}
                    onPress={() => this.addToWhishList(item.product_id)}
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
                    placeholder="Type Here..."
                    lightTheme
                    onChangeText={text => this.seachProducts(text)}
                    autoCorrect={false}
                    value={this.state.value}
                    />
                    )
                }}
                />

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
