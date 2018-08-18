// The idea of the app:
// I divide the app into three main component:
//  1. The timer and CountDown for the clock and the text displaying the time on the screen
//  2. Button group for restart and pause/start the timer
//  3. The TimeInput for handling the time from the user

import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import vibrate from "./utils/vibrate";
import Timer from "./Timer";
import CountDown from "./CountDown";
import TimeInput from "./TimeInput";
import TimerToggleButton from "./TimerToggleButton";

const DEFAULT_WORK_MINS = 25;
const DEFAULT_BREAK_MINS = 5;

const minToSec = mins => mins * 60;
const nextTimer = { work: "break", break: "work" };

export default class App extends React.Component {
  // To make the timer, I use the time in seconds, so I need to convert the minutes to seconds
  // Since in class Timer, to get the clock ticking every second, I use the Date.now() function to get real time
  // in ms, so we have to multiply the time remaining with 1000
  state = {
    workTime: minToSec(DEFAULT_WORK_MINS),
    breakTime: minToSec(DEFAULT_BREAK_MINS),
    timeRemaining: minToSec(DEFAULT_WORK_MINS) * 1000,
    isRunning: true,
    active: "work"
  };

  // When the app started, starting the clock with the default time
  componentDidMount() {
    this.timer = new Timer(
      this.state.timeRemaining,
      this.updateClock,
      this.handleClockEnd
    );
  }

  // handle displaying the clock every second
  updateClock = timeRemaining => {
    this.setState({ timeRemaining });
  };

  // when onn period time elapsed, vibrate the phone and change to the next period time
  handleClockEnd = () => {
    vibrate();
    this.changeState(this.state.active);
  };

  // update the time from the user
  // first check the timeType (work or break) needed to change
  // Then take the time change in seconds and make the new Timer
  // If user change the current running time type, stop the clock
  updateTime = timeType => time => {
    if (this.state.active === timeType) {
      if (this.timer) this.timer.stop();
      const timeRemaining = +time * 1000;
      this.timer = new Timer(
        timeRemaining,
        this.updateClock,
        this.handleClockEnd
      );
      this.timer.stop();
      this.setState({
        [`${timeType}Time`]: time,
        isRunning: this.timer.isRunning
      });
    } else {
      this.setState({
        [`${timeType}Time`]: time,
        isRunning: this.timer.isRunning
      });
    }
  };

  // Change to the next time period
  changeState = timeType => {
    const nextState = nextTimer[timeType];
    const timeRemaining = this.state[`${nextState}Time`] * 1000;
    if (this.timer) this.timer.stop();
    this.timer = new Timer(
      timeRemaining,
      this.updateClock,
      this.handleClockEnd
    );
    this.setState({ active: nextState, timeRemaining });
  };

  // toggle the pause and start timer
  togglePauseAndStart = () => {
    if (!this.timer) return;
    else if (this.timer.isRunning) this.timer.stop();
    else this.timer.start();
    this.setState({ isRunning: this.timer.isRunning });
  };

  // if the user click reset the timer
  onReset = () => {
    const timeRemaining = this.state[`${this.state.active}Time`] * 1000;
    if (this.timer) this.timer.stop();
    this.timer = new Timer(
      timeRemaining,
      this.updateClock,
      this.handleClockEnd
    );
    this.setState({ timeRemaining });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.center]}>
          {this.state.active.toUpperCase()} TIMER{" "}
        </Text>
        <CountDown timeRemaining={this.state.timeRemaining} />
        <View style={[styles.buttonGroup, styles.center]}>
          <TimerToggleButton
            onToggle={this.togglePauseAndStart}
            isRunning={this.state.isRunning}
          />
          <Button title="Reset" onPress={this.onReset} />
        </View>
        <TimeInput
          title="Work Time:"
          onChange={this.updateTime("work")}
          value={this.state.workTime}
        />
        <TimeInput
          title="Break Time:"
          onChange={this.updateTime("break")}
          value={this.state.breakTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: "#fff",
    alignItems: "stretch"
  },
  center: {
    alignSelf: "center"
  },
  buttonGroup: {
    flexDirection: "row"
  },
  title: {
    fontWeight: "bold",
    fontSize: 48
  }
});
