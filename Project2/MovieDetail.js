import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { API_KEY_PARAM, API_KEY_VALUE, OMDB_API } from "./apikey";

const idParam = "i";

buildGetMovieHttpRequest = id => {
  return `${OMDB_API}?${idParam}=${id}&${API_KEY_PARAM}=${API_KEY_VALUE}`;
};

export default class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("title")
  });

  state = {
    movie: null
  };

  componentWillMount() {
    this.fetchMovieData(this.props.navigation.getParam("id"))
  }

  fetchMovieData = async (id) => {
    let requestUrl = buildGetMovieHttpRequest(id);
    const response = await fetch(requestUrl);
    if (response.ok) {
      const result = await response.json();
      this.setState({ movie: result });
    } else {
      console.log(response.status);
      console.log(response.statusText);
    }
  };

  render() {
    if (!this.state.movie) {
      return null;
    }
    return (
      <View>
        <Image
          source={{
            uri: this.state.movie.Poster
          }}
          style={{
            marginLeft: 8,
            marginRight: 8,
            width: 200,
            height: 200,
            resizeMode: Image.resizeMode.stretch
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text>{this.state.movie.Title}</Text>
          <Text>{this.state.movie.Year}</Text>
          <Text>{`${this.state.movie.Rated}, ${
            this.state.movie.Runtime
          }`}</Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create();
