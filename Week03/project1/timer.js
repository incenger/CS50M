import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


const workTimeTitle = "WORK TIMER"
const breakTimeTitle = "BREAK TIMER"
const workTimeMinute = 25
const workTimeSecond = 0
const breakTimeMinute = 5
const breakTimeSecond = 0


export const breakTimer = {
    isWorking: false,
    title: breakTimeTitle,
    minutes: breakTimeMinute,
    seconds: breakTimeSecond
}

export const workTimer = {
    isWorking: true,
    title: workTimeTitle,
    minutes: workTimeMinute,
    seconds: workTimeSecond,
}

const formatTime = (minutes, seconds) => {
    const time = `${(minutes < 10) ? "0" : ""}${minutes}:${(seconds < 10) ? "0" : ""}${seconds}`
    return time
}


const Timer = props => (
  <View style={styles.timerContainer}>
    <Text style = {styles.title}> {props.title} </Text>
    <Text style = {styles.clock}> {formatTime(props.minutes, props.seconds)} </Text>
  </View>
)
export default Timer


const styles = StyleSheet.create({
    timerContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 48,      // alignItems: 'center',
      fontWeight: 'bold'
    },
    clock: {
      fontSize: 76,
      justifyContent: 'center',
    },
});
  
