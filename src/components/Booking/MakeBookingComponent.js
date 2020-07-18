import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, Image, StyleSheet, ScrollView } from 'react-native';
import Base from '../../Lib/Base';
import Storage from '../../Lib/Storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ListItem } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import DialogComponent from '../Reusable/DialogComponent';


export default class MakeBookingComponent extends Component {


  constructor(props) {
    super(props);
    this.arrayHolder = {};
  }
  state = {
    day: '',
    month: '',
    year: '',
    date: '',
    day_list: 1,
    appointments_list: [],
    refereshFlatList: true,
    days_booked: [],
    marked: null,
    dialogVisibility: false,
    timing_id: null,
    isLoggedIn: false,
    user: [],
    selectedDay: null,
    selectedMonth: null,
    selectedYear: null,
    monthAppointmensMonth: null,
    monthAppointmensYear: null,
    scrollMonth: null,
  }

  anotherFunc = () => {
    console.log(this.state.days_booked);
    // var obj = this.state.days_booked.reduce((c, v) => Object.assign(c, {[v]: {marked: true, selected: true, dotColor: 'red'}}), {});
    var obj = this.state.days_booked.reduce((c, v) => Object.assign(c, { [v]: { marked: true, selected: true, dotColor: 'red' } }), {});
    console.log(obj);
    this.setState({ marked: obj });
  }
  async componentDidMount() {
    Storage.isLoggedIn(this);
    this.setTodayDateToState();
    await fetch(Base.getBaseUrl() + 'user/getappointmentsfortheday?d=' + this.state.day
      + '&m=' + this.state.month
      + '&y=' + this.state.year).then(response => response.json()).then(res => {
        this.setState({
          appointments_list: res.timings,
        });
      });

    await fetch(Base.getBaseUrl() + 'user/getcurrentmonthappointments?&m=' + this.state.month
      + '&y=' + this.state.year).then(response => response.json()).then(res => {
        if (res.isFound) {

          // console.log(res.bookings);
          this.arrayHolder = res.bookings.map((e, i) => {
            //console.log(e.dday);
            // return "'"+e.dday+"'"+ ":{selected: true, marked: true,selectedColor: 'red'},";
            return e.dday;
          });

          this.setState({
            days_booked: this.arrayHolder,
          });

          // this.state.days_booked.forEach((day) => {
          // console.log(day);
          // })
          //console.log(this.arrayHolder);

        }

      });

    this.anotherFunc();
  }


  async getAppointmentsForMonth(month, year) {
    await fetch(Base.getBaseUrl() + 'user/getcurrentmonthappointments?&m=' + month
      + '&y=' + year).then(response => response.json()).then(res => {
        if (res.isFound) {

          // console.log(res.bookings);
          this.arrayHolder = res.bookings.map((e, i) => {
            //console.log(e.dday);
            // return "'"+e.dday+"'"+ ":{selected: true, marked: true,selectedColor: 'red'},";
            return e.dday;
          });

          this.setState({
            days_booked: this.arrayHolder,
          });

          // this.state.days_booked.forEach((day) => {
          // console.log(day);
          // })
          //console.log(this.arrayHolder);

        }

      }).then(() => {
        //alert('working');
        this.anotherFunc();

      });
  }

  dialogCallback = action => {
    if (action === 'cancel') {
      this.setState({
        dialogVisibility: false,
      }, () => {
        this.getSelectedDayAppointments(this.state.selectedDay, this.state.selectedMonth, this.state.selectedYear);
      })
    } else {
      this.setState({
        dialogVisibility: false,
      })
    }
  }

  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    // this.setState({
    //   day: dd,
    //   month: mm,
    //   year: yyyy
    // });

    return today;
  }

  setTodayDateToState() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.setState({
      day: dd,
      month: mm,
      year: yyyy,
      selectedDay: dd,
      selectedMonth: mm,
      selectedYear: yyyy,
      scrollMonth: mm,
    });
  }

  getSelectedDayAppointments(day, month, year) {

    fetch(Base.getBaseUrl() + 'user/getappointmentsfortheday?d=' + day
      + '&m=' + month
      + '&y=' + year).then(response => response.json()).then(res => {
        this.setState({
          appointments_list: res.timings,
          refereshFlatList: !this.state.refereshFlatList,
        });
      });
  }

  returnIcon(item) {
    if (item.timing_id == null) {
      return (
        <Icon name='plus'
          type='evilicon'
          color="gray" />
      )
    } else {
      return (
        <Icon name='check'
          type='evilicon'
          color="green" />
      );
    }
  }

  isBooked(item) {
    if (item.timing_id == null) {
      return '';
    } else {
      return 'Time is booked';
    }
  }

  timeClickedShowDialog = id => {
    this.setState({
      dialogVisibility: !this.state.dialogVisibility,
      timing_id: id,
    });
  }

  returnDaysToCalendarForMarking() {
    this.arrayHolder = this.state.days_booked.map((day, index) => {
      // return '2019-07-25': { selected: true, marked: true,selectedColor: 'red'};
    });


    let st = JSON.stringify(this.arrayHolder);
    console.log(st);


    return st;
  }

  keyExtractor = (item, index) => index.toString();

  returnListItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.time_range}
        subtitle={this.isBooked(item)}
        subtitleStyle={{ color: 'gray', fontSize: 13 }}
        leftIcon={{ name: 'av-timer' }}
        // rightIcon={{ name: this.returnIcon(item), color:'green', type:'material' }}
        rightIcon={this.returnIcon(item)}


        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
        // title="Chris Jackson"
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        subtitleStyle={{ color: 'gray' }}
        // subtitle="Vice Chairman"
        chevronColor="gray"
        //disabled={true}
        //chevron
        onPress={() => {
          this.timeClickedShowDialog(item.id)
        }}
      />


    );
  }



  render() {
    return (
      <View style={{ marginTop: 40, height: responsiveHeight(90) }}>
        <CalendarList
          // Initially visible month. Default = Date()
          current={this.getTodayDate()}
          horizontal={true}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2022-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            this.getSelectedDayAppointments(day.day, day.month, day.year);
            this.setState({
              selectedDay: day.day,
              selectedMonth: day.month,
              selectedYear: day.year,
            });
            //this.props.navigation.navigate('BookingForm',{day: day.day, month: day.month, year: day.year});
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => { alert(day) }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => { alert(month) }}
          // Hide month navigation arrows. Default = false
          //hideArrows={false}
          onVisibleMonthsChange={(months) => {
            if (months[0].month != this.state.scrollMonth) {
              this.setState({
                scrollMonth: months[0].month,
              }, () => {
                this.getAppointmentsForMonth(months[0].month, months[0].year);
              })
            }

          }}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          //hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          //disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          //hideDayNames={true}
          // Show week numbers to the left. Default = false
          //showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}

          markedDates={this.state.marked}

          // markedDates={{
          //   '2019-09-01': {selected: true, marked: true, selectedColor: 'yellow'},
          //   '2019-09-02': {marked: true},
          //   '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
          //   '2012-05-19': {disabled: true, disableTouchEvent: true}
          // }}

          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
        <Text style={{ alignSelf: 'center' }}>Book an appointment</Text>
        {/* <ScrollView style={{height: responsiveHeight(40)}}>
{
  this.state.appointments_list.map((item, i) => (
    this.returnListItem(item,i)
  ))
}
</ScrollView> */}

        <FlatList
          style={{ marginBottom: 34 }}
          extraData={this.state.refereshFlatList}
          keyExtractor={this.keyExtractor}
          data={this.state.appointments_list}
          renderItem={this.returnListItem}
        />
        {/* //this.state.dialogVisibility */}

        <DialogComponent day={this.state.selectedDay} month={this.state.selectedMonth} year={this.state.selectedYear} timing_id={this.state.timing_id} callBack={this.dialogCallback} dialogVisibility={this.state.dialogVisibility} />

      </View>
    );
  }
}
