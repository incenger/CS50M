import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'
import Timer, {breakTimer, workTimer} from './timer'

export default class App extends React.Component {

  state = {
    isRunning: false,
    ...workTimer
  }

  changeTimerState() {
    this.setState(() => isRunning ? breakTimer : workTimer)
  }


  countDown() {
    // if the time has counted down to 0, reverse the timing state
    if (this.state.minutes === 0 && this.state.seconds === 1) {
      vibrate()
      this.changeTimerState();
      return;
    }

    this.setState(prevState => (
        {
          minutes: (prevState.seconds === 0) ? prevState.minutes -1 : prevState.minutes,
          seconds: (prevState.seconds === 0) ? 59: prevState.seconds -1
        }
      )
    )
  }

  resetTimer() {
    clearInterval(this.interval)
    this.setState(() => (this.state.isWorking) ? {
      isRunning: !this.state.isRunning,
      ...workTimer
    } : {
      isRunning: !this.state.isRunning,
      ...breakTimer
    })
  }


  startTimer = () => {
    this.setState({isRunning: !this.state.isRunning})
    this.interval = setInterval(() => this.countDown(), 1000)
  }

  pauseTimer = () => {
    this.setState({isRunning: !this.state.isRunning})
    clearInterval(this.interval)
  } 


  render() {
    return (
      <View style={styles.container}>
        <Timer
            title = {this.state.title}
            minutes = {this.state.minutes}
            seconds = {this.state.seconds}/> 
        <View style = {styles.buttonContainer}>
          {this.state.isRunning && <Button title = "Pause" onPress={this.pauseTimer} />}
          {!this.state.isRunning && <Button title = "Start" onPress={this.startTimer} />}
          <Button title = "Reset" onPress={() => this.resetTimer()} />
        </View>
      </View>
      
    );
  }   
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});
