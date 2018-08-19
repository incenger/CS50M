import React from "react";
import { FlatList } from "react-native";
import Row from "./SearchResultRow";

const FlatListSearchResult = props => {
  return (
    <FlatList
      renderItem={({ item }) => <Row {...item} onPress={props.onPress} />}
      data={props.searchResult}
      keyExtractor={(item, index) => index}
    />
  );
};

export default FlatListSearchResult;
