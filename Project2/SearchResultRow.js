import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";


const Row = props => (
  <TouchableOpacity style={styles.rowContainer} onPress = {() => props.onPress(props.imdbID, props.Title)}>
    <Image
      style={styles.image}
      source={{
        uri: props.Poster
      }}
    />
    <View style={styles.textContainer}>
      <Text>{props.Title}</Text>
      <Text>{`${props.Year} (${props.Type})`}</Text>
    </View>
  </TouchableOpacity>
);

export default Row;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    margin: 16
  },
  textContainer: {
    flexDirection: "column"
  },
  image: {
    marginLeft: 8,
    marginRight: 8,
    width: 76,
    height: 76,
    resizeMode: Image.resizeMode.stretch
  }
});
