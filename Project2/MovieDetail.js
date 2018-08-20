import React from "react";
import {
  ProgressBarAndroid,
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text
} from "react-native";
import { API_KEY_PARAM, API_KEY_VALUE, OMDB_API } from "./apikey";

const idParam = "i";

buildGetMovieHttpRequest = id => {
  return `${OMDB_API}?${idParam}=${id}&${API_KEY_PARAM}=${API_KEY_VALUE}`;
};

renderRating = rating => {
  return (
    <Text style={styles.rating}>
      {rating.Source} : {rating.Value}
    </Text>
  );
};

export default class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("title")
  });

  state = {
    movie: null
  };

  componentWillMount() {
    this.fetchMovieData(this.props.navigation.getParam("id"));
  }

  fetchMovieData = async id => {
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
      <View style={styles.container}>
        <Image
          source={{
            uri: this.state.movie.Poster
          }}
          style={styles.image}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.title}>
            {`${this.state.movie.Title} (${this.state.movie.Year})`}
          </Text>
          <Text style={styles.Runtime}>
            {`${this.state.movie.Rated}, ${this.state.movie.Runtime}`}
          </Text>
        </View>
        <ScrollView style={{ flexDirection: "column" }}>
          <Text style={styles.plot}>{this.state.movie.Plot}</Text>
          {this.state.movie.Ratings.map(renderRating)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rating: {
    fontSize: 18,
    color: "red"
  },
  container: {
    margin: 16,
    flex: 1
  },
  image: {
    height: 250,
    resizeMode: Image.resizeMode.stretch
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green"
  },
  Runtime: {
    fontSize: 14
  },
  plot: {
    fontSize: 14
  }
});
