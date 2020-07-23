import React, { Component } from 'react'
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FormInput from '../Reusable/FormInput';
import MainToolbar from '../Toolbar/MainToolbar';
import Button from 'apsl-react-native-button';
import Storage from '../../Lib/Storage';
import Base from '../../Lib/Base';
import ImagePicker from 'react-native-image-picker';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-community/async-storage';
import * as axios from 'axios';
import * as Progress from 'react-native-progress';

export default class ProfileImageComponent extends Component {
  state = {
    imageUri: null,
    user: [],
    isLoggedIn: false,
    progress_circle: false,
  }

  static navigationOptions = {
    headerTitle: 'Profile Image',
  }


  async componentDidMount() {
    await Storage.isLoggedIn(this).then(() => {
      //  console.log("comp user = "+JSON.stringify(this.state.user));
    });
  }

  pickImage() {
    const options = {
      noData: true,
    };


    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //  console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          imageUri: response,
        });

      }
    });
  }



  storeData = async () => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(this.state.user));
      await AsyncStorage.setItem('@username', this.state.user.name);
      await AsyncStorage.setItem('@token', this.state.user.token);
    } catch (e) {
      // saving error
      console.log(e);
      alert('Error occurred in saving the loggedin user. Please try again.');
    }
  }

  uploadImage() {

    this.setState({
      progress_circle: true,
    })

    const profile_pic = {
      name: this.state.imageUri.fileName,
      type: this.state.imageUri.type,
      path: this.state.imageUri.uri,
      uri: Platform.OS == 'android' ? this.state.imageUri.uri : this.state.imageUri.uri.replace("file://", ""),
    }
    const formData = new FormData();
    formData.append("image", profile_pic);
    const url = "http://127.0.0.1/barber/public/api/user/updateprofilepic?token=" + this.state.user.token;
    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => response.json())
      .then(res => {
        if (res.isError) {
          this.setState({ progress_circle: false });
          alert(res.message);

        } else if (res.isChanged) {
          //

          this.setState({ 'user': res.user, progress_circle: false }, () => {
            this.storeData().then(() => {
              alert(res.message);
            });
          });
          //

        } else {
          alert(res.message);
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      })
  }

  getProfileImageView = () => {

    if (this.state.imageUri != null) {
      console.log("uri image not null");

      return (
        <View>
          <Image source={{ uri: this.state.imageUri.uri }} style={{ alignSelf: 'center', width: 200, height: 200 }} />
          <Button onPress={() => this.uploadImage()} style={{ backgroundColor: '#34D27C', alignSelf: 'center', marginTop: responsiveHeight(2), width: responsiveWidth(45), color: '#fff' }} textStyle={{ fontSize: 18 }}>
            <Text style={{ color: '#fff' }}> Upload Image</Text>
          </Button>
        </View>
      )
    }

    if (this.state.user.profile_image != null) {
      return (<View>
        <Image source={{ uri: Base.getWebUrl() + "uploads/profile/" + this.state.user.profile_image }} style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 80 }} />

      </View>)
    }
    else {
      console.log("else " + this.state.user.profile_image);
    }


  }

  render() {

    return (

      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', }}>
        {this.state.progress_circle &&
          <Progress.Circle size={30} indeterminate={true} style={{ alignSelf: 'center' }} />
        }
        <View>
          {this.getProfileImageView()}
          <View>
            <Button onPress={() => this.pickImage()} style={{ backgroundColor: '#34D27C', alignSelf: 'center', marginTop: responsiveHeight(2), width: responsiveWidth(45), color: '#fff' }} textStyle={{ fontSize: 18 }}>
              <Text style={{ color: '#fff' }}> Select Profile Image</Text>
            </Button>
          </View>
        </View>
      </View>


    )
  }
}
