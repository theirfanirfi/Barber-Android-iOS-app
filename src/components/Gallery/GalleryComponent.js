import React, { Component } from 'react';
import {View,Text,TouchableOpacity,FlatList,Platform,Image,StyleSheet} from 'react-native';
import Base from '../../Lib/Base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default class GalleryComponent extends Component {

    state = {
        gallery: [],
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

    async componentDidMount(){
        return fetch(Base.getBaseUrl()+'gallery').then((response) => response.json()).then((res) => {
            if(res.isFound){
                console.log(res);
            this.setState({gallery: res.gallery});
            }
           // console.log(res);
            //this.arrayHolder = res.proudcts;
        });
    }

returnHeight(){
  if(Platform.OS === 'ios'){
      return responsiveHeight(5);
  }else {
      return responsiveHeight(1);
  }
}



  renderIconMode = (isFav) => {
   //   if(this.state.i)
   if(this.state.isLoggedIn && isFav === 'true'){
       return true;
   }else {
    //console.log('else item is : '+isFav);
       return false;
   }


  }

  render() {
    return (

        <FlatList
        data={this.state.gallery}
        renderItem={({ item,index }) => {
            return (
                <TouchableOpacity style={{ flex:1,flexDirection: 'column' }} onPress={() => this.callBackRes(item.id)}>
            <View style={{ flex:1,flexDirection: 'column' }} >
             <Image source={{  uri: Base.getWebUrl()+'uploads/gallery/'+item.image_name}} style={style.image}/>
             <Text style={style.product_title}>{item.image_title}</Text>
            </View>
            </TouchableOpacity>

            )

        }}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom:responsiveHeight(10), marginTop: this.returnHeight()}}
        />
    );
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
