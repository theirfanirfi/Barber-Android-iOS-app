import React, { Component } from 'react'
import {View,Text,Platform,TouchableOpacity,Image} from 'react-native';
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FormInput from '../Reusable/FormInput';
import MainToolbar from '../Toolbar/MainToolbar';
import Button from 'apsl-react-native-button';
import Storage from '../../Lib/Storage';
import Base from '../../Lib/Base';
import ImagePicker from 'react-native-image-picker';
import base64 from 'react-native-base64'
export default class ProfileImageComponent extends Component {
    state = {
          imageUri: 'https://i.dawn.com/large/2017/10/59d080eb5b178.jpg',
        //imageUri: null,
       // imageUri: "file:///Users/eapple/Library/Developer/CoreSimulator/Devices/5A641984-12AD-4991-964E-429721A5225C/data/Containers/Data/Application/882C2ED9-EB22-48CA-B003-F73F5E099E32/tmp/755A34BC-ED61-43A4-B07A-227507252229.jpg",
        user:[],
        isLoggedIn: false,
    }

    static navigationOptions = {
        headerTitle: 'Profile Image',
    }
    

    async componentDidMount(){
        await Storage.isLoggedIn(this);
    }

    pickImage(){
        const options = {
            noData: true,
          };


          ImagePicker.launchImageLibrary(options,(response) => {
            //console.log('Response = ', response);
           
            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
             // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            //  console.log('User tapped custom button: ', response.customButton);
            } else {
              //const source = { uri: response.uri };
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
             // console.log(response);
           
              this.setState({
                imageUri: response,
              });

            }
          });
    }

    async uploadImage() {
     
      const profile_pic = {
        name: this.state.imageUri.fileName,
        type: this.state.imageUri.type,
        path: this.state.imageUri.uri,
        uri: Platform.OS == 'android' ? this.state.imageUri.uri : this.state.imageUri.uri.replace("file://",""),
      }


        const formData = new FormData();
      //   params = {
      //     token: this.state.user.token,
      //     image: JSON.stringify(profile_pic),
      //     some: '123',
      // };

      // for (var k in params) {
      //   formData.append(k, params[k]);
      // }

   //   console.log(base64.encode(this.state.imageUri.data));
      formData.append('image',profile_pic);
      formData.append('some','my name is not khan');

      //formData.append('image',this.state.imageUri,{filename: 'something', contentType: 'image/jpeg'});

      var request = {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData
    };

    fetch(Base.getBaseUrl()+"user/updateprofilepic?token="+this.state.user.token,request)
    .then(response => response.json())
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
    }


    render() {

        return (

            <View style={{ flex:1,justifyContent:'center',flexDirection:'column', }}>

            <View>
                <Image source={{uri: this.state.imageUri.uri}} style={{alignSelf: 'center',width: 200, height: 200}} />
                <Button onPress={() => this.uploadImage()} style={{ backgroundColor: '#34D27C',alignSelf: 'center' ,marginTop:responsiveHeight(2),width: responsiveWidth(45),color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Text style={{ color:'#fff' }}> Upload Image</Text>
                </Button>
               
                <View>
                <Button onPress={() => this.pickImage()}  style={{ backgroundColor: '#34D27C',alignSelf: 'center' ,marginTop:responsiveHeight(2),width: responsiveWidth(45),color:'#fff'}} textStyle={{fontSize: 18}}>
                    <Text style={{ color:'#fff' }}> Select Profile Image</Text>
                </Button>
                </View>
            </View>
            </View>


        )
    }
}
