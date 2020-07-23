import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import ExampleComponent from "react-rounded-image";
import timediff from 'timediff';
export default class RecieverChatView extends Component {
    state = {
        isLoggedIn: false,
        user: [],
        calculateTime: null,
    }

    static = {
        msgObj: PropTypes.object,
    }
    constructor(props) {
        super(props);
        Storage.isLoggedIn(this);
        this.mTime = '0min';
    }

    calculateTimeDiff() {
        let nowTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var result = timediff(this.props.msgObj.msg_send_time, nowTime, 'YDHms');

        //console.log(result);
        var ago = '';



        if (result.years > 0) {
            ago += result.years + " Years ";
        }

        if (result.months && result.months > 0) {
            ago += result.months + " mon ";
        }

        if (result.days > 0) {
            ago += result.days + ' d ';

        }

        if (result.hours && result.hours > 0) {
            ago += result.hours + " h ";
        }

        if (result.minutes > 0) {
            ago += result.minutes + ' min ';

        } else {
            ago += " 0min";
        }

        ago += " ago";
        this.mTime = ago;
        return ago;
    }

    showAlternate(action = 'summarryoftime') {
        if (action == 'summarryoftime') {
            this.mTime = this.calculateTimeDiff();
        } else {
            this.mTime = this.props.msgObj.msg_send_time;
        }
    }

    async componentDidMount() {
        this.showAlternate();
    }

    render() {
        return (
            <View>
                <Text onPress={() => {
                    this.showAlternate('actualtime')
                }} style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: 4, marginTop: 20, fontSize: 10, color: 'gray' }}>{this.mTime}</Text>

                <View style={{ alignSelf: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                    {this.state.user.profile_image != "" &&
                        <Image

                            source={{ uri: this.state.user.profile_image }}
                            style={{ width: 40, height: 40, borderRadius: 20, alignSelf: 'flex-start' }}
                        />
                    }
                    <View style={style.view}>
                        <Text style={style.text}>
                            {this.props.msgObj.msg}
                        </Text>
                    </View>



                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    view: {
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        padding: 10,
        margin: 8,
    },
    text: {
        color: 'black',
    }
});