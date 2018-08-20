import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const Row = props => (
  <View
    style={{
      borderBottomColor: "black",
      borderBottomWidth: 0.5,
      margin: 16
    }}
  >
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => props.onPress(props.imdbID, props.Title)}
    >
      <Image
        style={styles.image}
        source={{
          uri: props.Poster
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.Title}
        </Text>
        <Text style={styles.description}>{`${props.Year} (${
          props.Type
        })`}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Row;

const styles = StyleSheet.create({
  rowContainer: {
    width: 320,
    flexDirection: "row"
  },
  textContainer: {
    flexDirection: "column",
    marginBottom: 8
  },
  image: {
    marginRight: 8,
    marginBottom: 8,
    width: 76,
    height: 76,
    resizeMode: Image.resizeMode.stretch
  },
  title: {
    width: "55%",
    fontSize: 20,
    fontWeight: "bold",
    color: "green"
  },
  description: {
    fontSize: 14
  }
});
