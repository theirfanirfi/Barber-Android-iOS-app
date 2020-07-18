import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet } from 'react-native';
import Base from '../../Lib/Base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
export default class GalleryComponent extends Component {

    state = {
        gallery: [],
        columns: 1
    }

    onSwipeUp(gestureState) {
        this.setState({ columns: 1 });
    }

    onSwipeDown(gestureState) {
        this.setState({ columns: 2 });

    }

    async componentDidMount() {
        return fetch(Base.getBaseUrl() + 'gallery').then((response) => response.json()).then((res) => {
            if (res.isFound) {
                console.log(res);
                this.setState({ gallery: res.gallery });
            }
            // console.log(res);
            //this.arrayHolder = res.proudcts;
        });
    }

    returnHeight() {
        if (Platform.OS === 'ios') {
            return responsiveHeight(5);
        } else {
            return responsiveHeight(1);
        }
    }




    render() {
        return (
            <GestureRecognizer
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
            >
                <FlatList
                    data={this.state.gallery}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }} onPress={() => console.log(item.image_name)}>
                                <View style={{ flex: 1, flexDirection: 'column' }} >
                                    <Image source={{ uri: Base.getWebUrl() + 'uploads/gallery/' + item.image_name }} style={style.image} />
                                    <Text style={style.product_title}>{item.image_title}</Text>
                                </View>
                            </TouchableOpacity>

                        )

                    }}
                    numColumns={this.state.columns}
                    key={this.state.columns}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginBottom: responsiveHeight(10), marginTop: this.returnHeight() }}
                />
            </GestureRecognizer>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
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
