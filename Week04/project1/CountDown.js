// This component displaying the current time remaining on the screen
// It take the time remaining in ms, converted into MM:SS type
import React from 'react'
import {Text, StyleSheet} from 'react-native'


const CountDown = props => {
    const totalSecs = Math.round(props.timeRemaining/1000)
    const mins = Math.floor(totalSecs/60)
    const secs = totalSecs % 60
    const padding = secs < 10 ? "0" : ""
    return <Text style={styles.clock}>{mins}:{padding}{secs} </Text>
}

const styles = StyleSheet.create({
    clock: {
      fontSize: 80,
      alignSelf: 'center',
    },
});

export default CountDown