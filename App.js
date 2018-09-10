/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Picker, AppState, PushNotificationIOS} from 'react-native';
import PushController from './src/pushController'
import PushNotification from 'react-native-push-notification'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state={
      seconds: ''
    }
    this.handleAppStatehange = this.handleAppStatehange.bind(this)
  }
  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStatehange);
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this.handleAppStatehange);
  }
  handleAppStatehange(appState){
    if(appState=='background'){
      // let date = new Date(Date.now()+(this.state.seconds*1000))
      // if(Platform.OS == 'ios'){
      //   date = date.toISOString();
      // }
      // PushNotification.localNotificationSchedule({
      //   //... You can use all the options from localNotifications
      //   title: "My Notification Title", // (optional)
      //   date: date // (required)
      //   // message: "My Notification Message",

      // });
      //  console.log('app is in background', this.state.seconds)
      let date = new Date(Date.now() + (6 * 1000));

PushNotification.localNotificationSchedule({
  message: "My Notification Message", // (required)
  date: date // in 60 secs
})
    }
  }
  render() {
    return (
      <View>
        <Text>Choose notification time in seconds</Text>
        <Picker style={styles.picker} selectedValue = {this.state.seconds}
        onValueChange={(seconds)=>this.setState({seconds})}
        >
        <Picker.Item label="5" value={5}/>
        <Picker.Item label="8" value={8}/>
        <Picker.Item label="10" value={10}/>
        </Picker>
        <PushController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    picker: {
    width: 100
  }
});
