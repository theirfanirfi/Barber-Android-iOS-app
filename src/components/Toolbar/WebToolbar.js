import React from 'react'
import PropTypes from 'prop-types'
import {ToolbarAndroid,StyleSheet, View} from 'react-native';
import Storage from '../../Lib/Storage';
export default class WebToolbar extends React.Component{


  constructor(props){
    super(props);
  }

state = {
  'isLoggedOut': false,
}
static propTypes = {
  title: PropTypes.string,
  resCallBack: PropTypes.func.isRequired,
}

returnResToWebReload = (which) => {
  this.props.resCallBack(which);
}
  render () {

    return (
      <View>
        <ToolbarAndroid
       // logo={require('./app_logo.png')}
        title={this.props.title}
        actions={[{title: 'Done', show: 'always'},
      {title: 'Redo', show: 'always'}
      ]}
        style={style.toolbar}
        onActionSelected={this.onActionSelected}
        />

      </View>

    )
  }


  onActionSelected = position => {
  if (position === 0) { // index of 'Settings'
  this.returnResToWebReload('done');
  }else if(position === 1){
    this.returnResToWebReload('reload');
  }
}

}

const style = StyleSheet.create({
  toolbar: {
    backgroundColor: '#f9f9f9',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
