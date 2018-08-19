import React from "react";
import {createStackNavigator} from 'react-navigation'
import MovieDetailsScreen from "./MovieDetail";
import SearchScreen from './SearchScreen'


const MainStack = createStackNavigator({
  Search: SearchScreen,
  Details: MovieDetailsScreen
},
{
  initialRouteName: 'Search'

})

export default class App extends React.Component {
  render() {
    return (
      <MainStack />
    )
  }
}
