import React, { Component } from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

export default class GalleryComponent extends Component {

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
        data={this.state.data}
        extraData={this.state.isUnFav}
        renderItem={({ item,index }) => {
            return (
                <TouchableOpacity style={{ flex:1,flexDirection: 'column' }} onPress={() => this.callBackRes(item.product_id)}>
            <View style={{ flex:1,flexDirection: 'column' }} >
             <Image source={{  uri: item.product_image}} style={style.image}/>
             <Text style={style.product_title}>{item.product_name}</Text>
             <View style={{ flex:1,flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={style.pricing}>${item.product_price} </Text>
         
            <Icon 
            name={this.renderIconMode(item.isFav) ? 'favorite': 'favorite-border'}
            type='material'
            iconStyle={{flex:1,alignSelf: 'flex-end',marginRight: 12, color: this.renderIconMode(item.isFav) ? 'red' : '#000', }}
            size={responsiveWidth(6)}
            onPress={() => this.addToWhishList(this.myRef.current,item.product_id)}
            ref={this.myRef}
            />

            </View>
            
            {/* <Text style={{ margin:4 }}>{item.product_desc.substr(0,100)+'...'}</Text> */}
            {this.returnDescription(item.product_desc)}
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
