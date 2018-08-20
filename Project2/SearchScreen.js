import React from "react";
import { TextInput, StyleSheet, Button, Text, View } from "react-native";
import FlatListSearchResult from "./FlatListSearchResult";
import { API_KEY_PARAM, API_KEY_VALUE, OMDB_API } from "./apikey";

const searchParam = "s";

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Movie Browser"
  });
  state = {
    searchQuery: "",
    searchSuccess: false,
    error: null,
    result: null
  };

  onPress = (id, title) => {
    this.props.navigation.push("Details", { id, title });
  };

  convertString = string => string.replace(/\s/g, "+");

  buildSearchHttpRequest = query => {
    let convertedQuery = this.convertString(query);
    return `${OMDB_API}?${searchParam}=${convertedQuery}&${API_KEY_PARAM}=${API_KEY_VALUE}`;
  };

  fetchMovieData = async query => {
    if (this.state.searchQuery === "") return;
    const httpRequest = this.buildSearchHttpRequest(query);
    const response = await fetch(httpRequest);
    if (response.ok) {
      const moviesData = await response.json();
      console.log(moviesData);
      if (moviesData.Response === "True") {
        this.setState({ result: moviesData.Search, searchSuccess: true });
      } else {
        this.setState({ error: moviesData.Error, searchSuccess: false });
      }
    } else {
      console.log(response.status);
      console.log(response.statusText);
    }
  };

  handleTextChange = text => {
    this.setState({ searchQuery: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          defaultValue={this.state.searchQuery}
          onChangeText={this.handleTextChange}
          value={this.state.searchQuery}
          placeholder="Search for movie title"
        />
        <Button
          title="Search"
          onPress={() => this.fetchMovieData(this.state.searchQuery)}
        />
        {this.state.searchSuccess && (
          <FlatListSearchResult
            searchResult={this.state.result}
            onPress={this.onPress}
          />
        )}
        {!this.state.searchSuccess && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 1,
    borderColor: "black",
    minWidth: 340,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    justifyContent: "center"
  },
  error: {
    fontSize: 38,
    color: "red"
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
