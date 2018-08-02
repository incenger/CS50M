import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20
  },
  textInputContainer: {
    flexDirection: "row",
    marginLeft: "auto"
  },
  bold: {
    fontWeight: "bold"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    marginRight: 10,
    paddingHorizontal: 5,
    minWidth: 50
  }
});

export default class TimeInput extends React.Component {
  state = {
    mins: Math.floor(this.props.value / 60),
    secs: this.props.value % 60
  };

  handleMinChange = minStr => {
    const mins = +minStr;
    this.setState({ mins });
    this.props.onChange(mins * 60 + this.state.secs);
  };

  handleSecChange = secStr => {
    const secs = +secStr;
    this.setState({ secs });
    this.props.onChange(this.state.mins * 60 + secs);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.title && (
          <Text style={styles.bole}>{this.props.title} </Text>
        )}
        <View style={styles.textInputContainer}>
          <Text> Mins: </Text>
          <TextInput
            style={styles.textInput}
            defaultValue={`${this.state.mins}`}
            keyboardType="numeric"
            onChangeText={this.handleMinChange}
          />
          <Text> Secs: </Text>
          <TextInput
            style={styles.textInput}
            defaultValue={`${this.state.secs}`}
            keyboardType="numeric"
            onChangeText={this.handleSecChange}
          />
        </View>
      </View>
    );
  }
}
