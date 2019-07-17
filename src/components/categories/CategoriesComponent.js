import React, { Component } from 'react'
import { Icon,Button,SearchBar } from 'react-native-elements'
import {View,StyleSheet,Text,Platform, Image,FlatList,TouchableOpacity} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types'
import Base from '../../Lib/Base';
export default class CategoriesComponent extends Component {
    state = {
        categories: [],
        value: '',
    }

    constructor(props){
        super(props);
        this.catsHolder = [];
    }
   async componentDidMount(){
    let BASE_URL = Base.getBaseUrl();
    return fetch(BASE_URL+'getcats').then(response => response.json()).then((res) => {
        this.setState({categories: res.categories});
        this.catsHolder = res.categories;
        console.log(res);
    });
    }

    searchCats = text => {
        this.setState({value: text});
        const searchedData = this.catsHolder.filter((item) => {
            const cat = `${item.cat_title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return cat.indexOf(textData) > - 1;
        });

        this.setState({categories: searchedData});
    }

    returnHeight(){
        if(Platform.OS === 'ios'){
            return responsiveHeight(5);
        }else {
            return responsiveHeight(1);
        }
    }

    render() {
        return (
            <FlatList
            data={this.state.categories}
            renderItem={({ item,index }) => {
                return (
                <TouchableOpacity onPress={() => this.props.navigation.push('CatProducts',{cat_id: item.cat_id})}>
                    <View style={{ flexDirection:'row', alignContent: 'center' }}>

                 <Image source={{  uri: item.cat_image}} style={style.image}/>
                 <Text style={style.product_title}>{item.cat_title}</Text>
                 </View>

                </TouchableOpacity>
                        
                )

            }}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => {
                return (
                <SearchBar
                placeholder="Search Categories..."
                lightTheme
                onChangeText={text => this.searchCats(text)}
                autoCorrect={false}
                value={this.state.value}
                />
                )
            }}
            style={{ marginBottom:responsiveHeight(10), marginTop:this.returnHeight()}}

            />
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flex:1,
        alignContent: 'center',
    },

    image: {
        width: '30%',
        height: responsiveHeight(20),
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
        marginLeft: 12,
        alignSelf: 'center',
        //font: 'bold',
    }

  });
