import React from "react";
import { TextInput, StyleSheet, Button, View } from "react-native";
import FlatListSearchResult from "./FlatListSearchResult";
import { API_KEY_PARAM, API_KEY_VALUE, OMDB_API } from "./apikey";

const searchParam = "s";

export default class SearchScreen extends React.Component {
  state = {
    searchQuery: "",
    result: null
  };

  onPress= (id, title) => {
    this.props.navigation.push("Details", {id, title});
  }

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
      this.setState({ result: moviesData.Search });
    } else {
      console.log(response.status);
      console.log(response.statusText);
    }
  };

  handleTextChange = text => {
    console.log(text);
    this.setState({ searchQuery: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Search" onPress={() => this.fetchMovieData(this.state.searchQuery)} />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            minWidth: 300,
            marginTop: 20,
            marginHorizontal: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 3
          }}
          defaultValue={this.state.searchQuery}
          onChangeText={this.handleTextChange}
          value={this.state.searchQuery}
        />
        <FlatListSearchResult searchResult={this.state.result} onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

